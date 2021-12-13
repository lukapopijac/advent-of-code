const fs = require('fs');
let f = fs.readFileSync('input.txt', 'utf8');
let [dots, folds] = f
    .trim()
    .split('\n\n')
;

dots = dots.trim().split('\n').map(p => p.split(',').map(x => +x));
folds = folds.trim().split('\n').map(t => t.slice(11).split('='));


(_ => {
    let m = 2**20;
    let set = new Set(dots.map(([x, y]) => m*x+y));
    for(let i=0; i<folds.length; i++) {
        let [coor, t] = folds[i];
        for(let dot of set) {
            let [x, y] = [dot/m|0, dot%m];
            if(coor=='y' && y>t) {
                set.delete(dot);
                set.add(m*x + 2*t-y);
            }
            if(coor=='x' && x>t) {
                set.delete(dot);
                set.add(m*(2*t-x) + y);
            }
        }

        // part 1
        if(i==0) console.log(set.size);
    }

    // part 2
    let max = [...set].reduce((acc, dot) => acc | dot, 0);  // `m` must be power of 2 for this to work
    let [maxX, maxY] = [max/m|0, max%m];
    let p = Array(maxY+1).fill(8).map(r => Array(maxX+1).fill(' '));

    for(let dot of set) p[dot%m][dot/m|0] = '*';

    console.log(p.map(line => line.join('')));
})();
