const fs = require('fs');
const { hasUncaughtExceptionCaptureCallback } = require('process');
let f = fs.readFileSync('input.txt', 'utf8');
let m = f
    .trim()
    .split('\n')
    .map(line => line.trim().split('').map(x => +x))
;

for(let i=0; i<m.length; i++) {
    m[i].unshift(9);
    m[i].push(9);
}
let n = m[0].length;
m.unshift(Array(n).fill(9));
m.push(Array(n).fill(9));


// part 1

(_ => {
    let ret = 0;
    for(let i=1; i<m.length-1; i++) {
        for(let j=1; j<m[i].length-1; j++) {
            if(
                m[i][j] < m[i-1][j] &&
                m[i][j] < m[i+1][j] &&
                m[i][j] < m[i][j-1] &&
                m[i][j] < m[i][j+1]
            ) {
                ret += m[i][j] + 1;
            }
        }
    }
    
    console.log(ret);
})();


// part 2

function find(x) {
    if(x.parent != x) {
        x.parent = find(x.parent);
        return x.parent;
    } else {
        return x;
    }
}

function union(x, y) {
    x = find(x);
    y = find(y);
    if(x == y) return;
    y.parent = x;
    x.size += y.size;
}

(_ => {
    let s = [];
    for(let i=1; i<m.length-1; i++) {
        s[i] = [];
        for(let j=1; j<m[i].length-1; j++) {
            if(m[i][j]<9) {
                let t = {size: 1};
                t.parent = t;

                if(m[i-1][j]<9) union(t, s[i-1][j]);
                if(m[i][j-1]<9) union(t, s[i][j-1]);

                s[i][j] = t;
            }
        }
    }

    let roots = new Set();
    for(let i=1; i<m.length-1; i++) {
        for(let j=1; j<m[i].length-1; j++) {
            if(s[i][j]) roots.add(find(s[i][j]));
        }
    }

    let largest = [...roots]
        .sort((x,y) => y.size-x.size)
        .slice(0, 3)
        .map(x => x.size)
    ;
    console.log(largest[0] * largest[1] * largest[2]);
})();
