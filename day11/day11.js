const fs = require('fs');
let f = fs.readFileSync('input.txt', 'utf8');
let a = f
    .trim()
    .split('\n')
    .map(x => x.split('').map(y => +y))
;


function allFlash(a) {  // needed for part 2
    for(let i=0; i<a.length; i++) {
        for(let j=0; j<a[0].length; j++) {
            if(a[i][j]>0) return false;
        }
    }
    return true;
}


(_ => {
    let flashes = 0;
    let m = a.length;
    let n = a[0].length;
    for(let step=0;; step++) {

        // part 1
        if(step==100) console.log('part 1:', flashes);
        
        // part 2        
        if(allFlash(a)) {
            console.log('part 2:', step);
            break;
        }

        for(let i=0; i<m; i++) for(let j=0; j<n; j++) a[i][j]++;

        let flash = true;
        while(flash) {
            flash = false;
            for(let i=0; i<m; i++) {
                for(let j=0; j<m; j++) {
                    if(a[i][j]>9) {
                        flash = true;
                        flashes++;
                        a[i][j] = 0;
                        if(a[i-1]?.[j-1] > 0) a[i-1][j-1]++;
                        if(a[i-1]?.[j  ] > 0) a[i-1][j  ]++;
                        if(a[i-1]?.[j+1] > 0) a[i-1][j+1]++;
                        if(a[i  ]?.[j-1] > 0) a[i  ][j-1]++;
                        if(a[i  ]?.[j+1] > 0) a[i  ][j+1]++;
                        if(a[i+1]?.[j-1] > 0) a[i+1][j-1]++;
                        if(a[i+1]?.[j  ] > 0) a[i+1][j  ]++;
                        if(a[i+1]?.[j+1] > 0) a[i+1][j+1]++;
                    }
                }
            }
        }
    }
})();
