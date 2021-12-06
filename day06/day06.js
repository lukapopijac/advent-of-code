const fs = require('fs');
let f = fs.readFileSync('input.txt', 'utf8');
let a = f
    .trim()
    .split(',')
    .map(x => +x)
;


// part 1

(_ => {  // brute force
    let fish = a.slice(0);
    for(let i=0; i<80; i++) {
        let n = fish.length;
        for(let j=0; j<n; j++) {
            fish[j]--;
            if(fish[j]<0) {
                fish[j] = 6;
                fish.push(8);
            }
        }
    }
    console.log(fish.length);
})();


// part 2

(_ => {
    let fish = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    for(let i=0; i<a.length; i++) fish[a[i]]++;
    for(let i=0; i<256; i++) {
        let fish0 = fish[0];
        for(let j=0; j<fish.length; j++) fish[j] = fish[j+1];
        fish[6] += fish0;
        fish[8] = fish0;
    }
    let s = 0;
    for(let f of fish) s += f;
    console.log(s);
})();
