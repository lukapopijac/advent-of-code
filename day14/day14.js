const fs = require('fs');
let f = fs.readFileSync('input.txt', 'utf8');
let a = f.trim().split('\n');
let polymer = a[0];
let rules = a
    .slice(2)
    .reduce((o, c) => {
        o[c.slice(0, 2)] = c[6];
        return o;
    }, {})
;


// part 1

(_ => {
    let p = polymer.split('').slice(0);
    for(let i=0; i<10; i++) {
        let newP = [];
        for(let j=0; j<p.length-1; j++) {
            newP.push(p[j]);
            let r = rules[p[j]+p[j+1]];
            if(r) newP.push(r);
        }
        newP.push(p[p.length-1]);
        p = newP;
    }
    
    let occur = {};
    for(let c of p) {
        if(!occur[c]) occur[c] = 0;
        occur[c]++;
    }
    
    let g = Object.entries(occur).sort((a, b) => a[1]-b[1]);
    console.log(g[g.length-1][1] - g[0][1]);
})();


// part 2

(_ => {
    let count = {};
    for(let i=0; i<polymer.length-1; i++) {
        let pair = polymer[i] + polymer[i+1];
        if(!count[pair]) count[pair] = 1n;
        else count[pair]++;
    }

    for(let i=0; i<40; i++) {
        let newCount = {};
        let pairs = Object.keys(count);
        for(let pair of pairs) {
            let c = rules[pair];
            let pair1 = pair[0] + c;
            let pair2 = c + pair[1];
            if(!newCount[pair1]) newCount[pair1] = 0n;
            if(!newCount[pair2]) newCount[pair2] = 0n;
            newCount[pair1] += count[pair];
            newCount[pair2] += count[pair];
        }
        count = newCount;
    }

    let occur = {};
    let pairs = Object.keys(count);
    for(let pair of pairs) {
        for(let char of pair) {
            if(!occur[char]) occur[char] = 0n;
            occur[char] += count[pair];
        }
    }

    let g = Object.entries(occur).sort((a, b) => a[1]<b[1] ? -1 : 1);
    let a = (g[0][1] + 1n)/2n | 0n;
    let b = (g[g.length-1][1] + 1n)/2n | 0n;
    console.log(b-a);
})();
