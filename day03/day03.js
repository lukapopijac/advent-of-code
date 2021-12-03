const fs = require('fs');
let f = fs.readFileSync('input.txt', 'utf8');
let a = f
    .trim()
    .split('\n')
    .map(x => x.split('').map(y => +y))
;

// part 1

let b = Array(a[0].length).fill(0);
for(let i=0; i<a.length; i++) {
    for(let j=0; j<b.length; j++) {
        b[j] += a[i][j];
    }
}

let c = b.map(x => Number(2*x > a.length));
let d = c.map(x => 1-x);

let c1 = parseInt(c.join(''), 2);
let d1 = parseInt(d.join(''), 2);

console.log(c1, d1, c1*d1);


// part 2

let g = a.slice(0);
for(let j=0; j<g[0].length; j++) {
    let bits = 0;
    for(let i=0; i<g.length; i++) bits += g[i][j];
    let bit = Number(2*bits >= g.length);
    g = g.filter(x => x[j]==bit)
    if(g.length <= 1) break;
}

let h = a.slice(0);
for(let j=0; j<h[0].length; j++) {
    let bits = 0;
    for(let i=0; i<h.length; i++) bits += h[i][j];
    let bit = Number(2*bits < h.length);
    h = h.filter(x => x[j]==bit)
    if(h.length <= 1) break;
}

let g1 = parseInt(g[0].join(''), 2);
let h1 = parseInt(h[0].join(''), 2);

console.log(g1, h1, g1*h1);
