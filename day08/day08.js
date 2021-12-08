const fs = require('fs');
let f = fs.readFileSync('input.txt', 'utf8');
let lines = f
    .trim()
    .split('\n')
    .map(line => line.split('|').map(x => x.trim().split(' ')))
;

// part 1

(_ => {
    let cnt = 0;
    for(let [digits, out] of lines) {
        for(let d of out) {
            let len = d.length;
            if(len<5 || len==7) cnt++;
        }
    }
    console.log(cnt);
})();


// part 2

(_ => {
    let decode = {
        467889 : 0,
        89     : 1,
        47788  : 2,
        77889  : 3,
        6789   : 4,
        67789  : 5,
        467789 : 6,
        889    : 7,
        4677889: 8,
        677889 : 9
    };

    let sum = 0;
    for(let [digits, out] of lines) {
        let map = digits
            .join('')
            .split('')
            .reduce((acc, cur) => ++acc[cur] && acc, {a:0,b:0,c:0,d:0,e:0,f:0,g:0})
        ;

        sum += +out
            .map(code =>     // map code to digit, example:
                decode[
                    code                      // 'cbgef'
                        .split('')            // ['c', 'b', 'g', 'e', 'f']
                        .map(c => map[c])     // [ 8 ,  9 ,  6 ,  7 ,  7 ]
                        .sort()               // [6, 7, 7, 8, 9 ]
                        .join('')             // '67789'
                ]                             // 5
            )
            .join('')
        ;
    }
    console.log(sum);
})();
