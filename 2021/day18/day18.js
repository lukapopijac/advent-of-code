let f = await Deno.readTextFile('./input.txt');
let numbers = f
    .trim()
    .split('\n')
;

function add(a, b) {
    let c = `[${a},${b}]`;
    while(true) {
        let e = explode(c);
        if(e != c) {
            c = e;
            continue;
        }
        let s = split(c);
        if(s != c) {
            c = s;
            continue;
        }
        break;
    }
    return c;
}

function explode(s) {
    let a = s.split('');
    let cnt = 0;
    let idxLeft = -1;
    let i = 0;
    for(; i<a.length; i++) {
        if(a[i]=='[') cnt++;
        if(a[i]==']') cnt--;
        if(idxLeft<0) {
            if(cnt==5) idxLeft = i;
        } else {
            if(cnt==4) break;
        }
    }
    if(idxLeft<0) return s;  // nothing to explode

    let idxRight = i+1;
    let [x, y] = s.substring(idxLeft+1, idxRight-1).split(',').map(t => +t);
    let left = s.substring(0, idxLeft).replace(/\d+(?!.*\d)/, m => +m + x); // last number not followed by a number
    let right = s.substring(idxRight).replace(/\d+/, m => +m + y);          // first number
    return left + 0 + right;
}

function split(s) {
    return s.replace(/\d\d+/, m => '[' + Math.floor(m/2) + ',' + Math.ceil(m/2) + ']');
}

function getMagnitude(s) {
    let t = '';
    while(t != s) {
        t = s;
        s = t.replace(/\[(\d+),(\d+)\]/, (m, a, b) => 3*a+2*b);
    }
    return s;
}


// part 1

(_ => {
    let k = numbers[0];
    for(let i=1; i<numbers.length; i++) {
        // console.log(k, '    ', numbers[i]);
        k = add(k, numbers[i]);
    }
    console.log(getMagnitude(k));
})();


// part 2

(_ => {
    let max = 0;
    for(let m of numbers) {
        for(let n of numbers) {
            if(m == n) continue;
            let mag = getMagnitude(add(m, n));
            if(mag > max) max = +mag;
        }
    }
    console.log(max);
})();
