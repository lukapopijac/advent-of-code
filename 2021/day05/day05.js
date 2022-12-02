const fs = require('fs');
let f = fs.readFileSync('input.txt', 'utf8');
let a = f
    .trim()
    .split('\n')
    .map(x => x
        .split('->')
        .map(y => y.split(','))
        .flat()
        .map(y => +y)
    )
;


// part 1

(_ => {
    let n = 1000;
    let matrix = Array(n).fill(0).map(row => Array(n).fill(0));

    for(let line of a) {
        if(line[0] == line[2]) {
            let x = line[0];
            let [y1, y2] = [line[1], line[3]];
            if(y1>y2) [y1, y2] = [y2, y1];
            for(let y=y1; y<=y2; y++) matrix[y][x]++;
        } else if(line[1] == line[3]) {
            let y = line[1];
            let [x1, x2] = [line[0], line[2]];
            if(x1>x2) [x1, x2] = [x2, x1];
            for(let x=x1; x<=x2; x++) {
                matrix[y][x]++;
            }
        }
    }

    // console.log(matrix.map(row => row.join('')));
    let cnt = 0;
    for(let i=0; i<n; i++) for(let j=0; j<n; j++) if(matrix[i][j]>1) cnt++;
    console.log(cnt);

})();


// part 2

(_ => {
    let n = 1000;
    let matrix = Array(n).fill(0).map(row => Array(n).fill(0));

    for(let line of a) {
        if(line[0] == line[2]) {
            let x = line[0];
            let [y1, y2] = [line[1], line[3]];
            if(y1>y2) [y1, y2] = [y2, y1];
            for(let y=y1; y<=y2; y++) matrix[y][x]++;
        } else if(line[1] == line[3]) {
            let y = line[1];
            let [x1, x2] = [line[0], line[2]];
            if(x1>x2) [x1, x2] = [x2, x1];
            for(let x=x1; x<=x2; x++) {
                matrix[y][x]++;
            }
        } else {
            let [x1, y1, x2, y2] = line;
            if(x1>x2) {
                [x1, x2] = [x2, x1];
                [y1, y2] = [y2, y1];
            }
            for(let s=0; s<=x2-x1; s++) {
                if(y1<y2) matrix[y1+s][x1+s]++;
                else      matrix[y1-s][x1+s]++;
            }
        }
    }

    // console.log(matrix.map(row => row.join('')));
    let cnt = 0;
    for(let i=0; i<n; i++) for(let j=0; j<n; j++) if(matrix[i][j]>1) cnt++;
    console.log(cnt);

})();
