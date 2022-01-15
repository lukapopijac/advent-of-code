/*
the instructions in the input.txt can be translated into these lines:

x=+( 11+z%26!=w[ 0]);         ; z=z*(1+25*x); z=z+x*( 6+w[ 0]); 
x=+( 11+z%26!=w[ 1]);         ; z=z*(1+25*x); z=z+x*(14+w[ 1]); 
x=+( 15+z%26!=w[ 2]);         ; z=z*(1+25*x); z=z+x*(13+w[ 2]); 
x=+(-14+z%26!=w[ 3]); z=z/26|0; z=z*(1+25*x); z=z+x*( 1+w[ 3]); 
x=+( 10+z%26!=w[ 4]);         ; z=z*(1+25*x); z=z+x*( 6+w[ 4]); 
x=+(  0+z%26!=w[ 5]); z=z/26|0; z=z*(1+25*x); z=z+x*(13+w[ 5]); 
x=+( -6+z%26!=w[ 6]); z=z/26|0; z=z*(1+25*x); z=z+x*( 6+w[ 6]); 
x=+( 13+z%26!=w[ 7]);         ; z=z*(1+25*x); z=z+x*( 3+w[ 7]); 
x=+( -3+z%26!=w[ 8]); z=z/26|0; z=z*(1+25*x); z=z+x*( 8+w[ 8]); 
x=+( 13+z%26!=w[ 9]);         ; z=z*(1+25*x); z=z+x*(14+w[ 9]); 
x=+( 15+z%26!=w[10]);         ; z=z*(1+25*x); z=z+x*( 4+w[10]); 
x=+( -2+z%26!=w[11]); z=z/26|0; z=z*(1+25*x); z=z+x*( 7+w[11]); 
x=+( -9+z%26!=w[12]); z=z/26|0; z=z*(1+25*x); z=z+x*(15+w[12]); 
x=+( -2+z%26!=w[13]); z=z/26|0; z=z*(1+25*x); z=z+x*( 1+w[13]); 

or, equivalently, these:

let a = [11, 11, 15, -14, 10, 0, -6, 13, -3, 13, 15, -2, -9, -2];
let b = [0, 0, 0, 1, 0, 1, 1, 0, 1, 0, 0, 1, 1, 1];
let c = [6, 14, 13, 1, 6, 13, 6, 3, 8, 14, 4, 7, 15, 1];
let z = 0;
for(let i=0; i<14; i++) {
    let m = z%26;
    if(b[i]) z = z/26|0;
    if(a[i]+m != w[i]) z = 26*z + c[i] + w[i];
}
*/


function getOutcomes() {
    let a = [11, 11, 15, -14, 10, 0, -6, 13, -3, 13, 15, -2, -9, -2];
    let b = [0, 0, 0, 1, 0, 1, 1, 0, 1, 0, 0, 1, 1, 1];
    let c = [6, 14, 13, 1, 6, 13, 6, 3, 8, 14, 4, 7, 15, 1];
    let outcomes = [];

    function recurse(k, conditions, z) {
        if(k==14) {
            outcomes.push({conditions, z});
            return;
        }
        let m = (z => w => z(w)%26)(z);
        if(b[k]) z = (z => w => z(w)/26|0)(z);
        recurse(k+1, conditions.concat(((k, m) => w => a[k]+m(w)==w[k])(k, m)), z);
        recurse(k+1, conditions.concat(((k, m) => w => a[k]+m(w)!=w[k])(k, m)), ((k, z) => w => 26*z(w)+c[k]+w[k])(k, z));
    }
    recurse(0, [], w => 0);

    return outcomes;
}

function findInput(conditions, digits) {
    let w = [];
    function recurse(k) {
        if(k==14) return w.join('');
        for(w[k] of digits) {
            if(conditions[k](w)) {
                let t = recurse(k+1);
                if(t) return t;
            }
        }
    }
    return recurse(0);
}


(_ => {
    let outcomes = getOutcomes();

    let w;

    w = Array(14).fill(1);  // this will give the smallest possible z
    let outcomesMin = outcomes.filter(outcome => outcome.z(w)==0);

    // out of outcomesMin, get all of those whose the highest possible z is still zero
    w = Array(14).fill(9);
    let outcomesMax = outcomesMin.filter(outcome => outcome.z(w)==0);

    console.log(outcomesMin.length == outcomesMax.length); // they are the same
    // conclusion: they always give z=0 independent of w.
    // now we can discard those expressions and analize only conditions


    // part 1

    for(let outcome of outcomesMax) {
        let input = findInput(outcome.conditions, [9, 8, 7, 6, 5, 4, 3, 2, 1]);
        if(input) {
            console.log(input);
            break;
        }
    }

    // part 2

    for(let outcome of outcomesMax) {
        let input = findInput(outcome.conditions, [1, 2, 3, 4, 5, 6, 7, 8, 9]);
        if(input) {
            console.log(input);
            break;
        }
    }

})();
