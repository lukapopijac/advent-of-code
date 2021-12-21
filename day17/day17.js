let x1, x2, y1, y2;

// example input: target area: x=20..30, y=-10..-5
// [x1, x2, y1, y2] = [20, 30, -10, -5];

// real input:    target area: x=244..303, y=-91..-54
[x1, x2, y1, y2] = [244, 303, -91, -54];


/*
shoot in direction (a, b):
k ..... step
(1)   y(k, b) = k * (b - (k-1)/2)
(2)   x(k, b) = k * (b - (k-1)/2), if  k <= a  <=>  2*x >= k*(k+1)
              = a*(a+1)/2        , otherwise

From (1), solving queadratic equation for k:
            D = (2*b+1)^2 - 8*y   must be a square integer.
            if p*q = -8*y, p<=q, p,q integers
            =>
            b = (q-p-2)/4
            k = p/2
*/


function getPOptions(n) {  // only even divisors up to sqrt(n)
    let ret = [];
    for(let d=2; d*d<=n; d+=2) {
        if(n%d==0) {
            ret.push(d);
            if(d*d!=n) ret.push(n/d);
        }
    }
    return ret.sort((a, b) => a - b);
}

(_ => {
    let pOptions = {};
    for(let y=y1; y<=y2; y++) pOptions[y] = getPOptions(-y*8);

    let bMax = -Infinity;  // for part 1
    let set = new Set();   // for part 2
    for(let y=y1; y<=y2; y++) {
        for(let p of pOptions[y]) {
            let q = -8*y/p;
            let b = (q-p-2)/4;
            if(b != Math.round(b)) continue;
            let k = p/2;
            for(let x=x1; x<=x2; x++) {
                if(2*x > k*(k+1)) {
                    let a = x/k + (k-1)/2;
                    if(a == Math.round(a)) {
                        set.add(''+a+','+b)
                        if(b > bMax) bMax = b;
                    }
                } else {
                    let a = (2*x)**.5|0;
                    if(a*(a+1) == 2*x) {
                        set.add(''+a+','+b)
                        if(b > bMax) bMax = b;
                    }
                }
            }
        }
    }

    console.log(bMax*(bMax+1)/2);  // part 1
    console.log(set.size);         // part 2
})();
