const fs = require('fs');
let f = fs.readFileSync('input.txt', 'utf8');
let a = f
    .trim()
    .split('\n')
    .map(x => x.split(' '))
;

// part 1

let x=0, y=0;
for(let [direction, steps] of a) {
    if(direction=='forward') x += +steps;
    if(direction=='down') y += +steps;
    if(direction=='up') y -= +steps;
}
console.log(x, y, x*y);


// part 2

x=0;
y=0;
let aim=0;
for(let [direction, steps] of a) {
    if(direction=='forward') {
        x += +steps;
        y += aim*steps;
    }
    if(direction=='down') aim += +steps;
    if(direction=='up') aim -= +steps;
}
console.log(x, y, x*y);
