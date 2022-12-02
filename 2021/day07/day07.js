const fs = require('fs');
let f = fs.readFileSync('input.txt', 'utf8');
let a = f
    .trim()
    .split(',')
    .map(x => +x)
;


// part 1

(_ => {
    let b = a.slice(0);
    b.sort((x, y) => x-y);
    let m = b[b.length/2];
    
    let s = 0;
    for(let c of b) {
        s += Math.abs(c-m);
    }
    console.log(s);
})();


// part 2

(_ => {
    let b = a.slice(0);

    let sum = 0;
    for(let c of b) sum += c;
    let m = Math.floor(sum/a.length);   // either floor or ceil will work

    let s = 0;
    for(let c of b) {
        s += (Math.abs(c-m)*(Math.abs(c-m)+1))/2;
    }
    console.log(s);
})();
