const fs = require('fs');
let f = fs.readFileSync('input.txt', 'utf8');
let a = f.trim().split('\n').map(x => +x);

// part 1

let c = 0;
for(let i in a) if(a[i]>a[i-1]) c++;
console.log(c);


// part 2

let b = a.map((_, i) => a[i] + a[i+1] + a[i+2]).slice(0, -2);
c = 0;
for(let i in b) if(b[i]>b[i-1]) c++;
console.log(c);
