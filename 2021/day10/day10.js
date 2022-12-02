const fs = require('fs');
let f = fs.readFileSync('input.txt', 'utf8');
let lines = f
    .trim()
    .split('\n')
;

// part 1

(_ => {
    let opening = {')':'(',']':'[','}':'{','>':'<'};
    let pointsMap = {')': 3, ']': 57, '}': 1197, '>': 25137};
    let points = 0;
    for(let line of lines) {
        let open = [];
        for(let c of line) {
            if(c in opening) {
                if(open.pop() != opening[c]) {
                    points += pointsMap[c];
                    break;
                }
            } else {
                open.push(c);
            }
        }
    }
    console.log(points);
})();


// part 2

(_ => {
    let opening = {')':'(',']':'[','}':'{','>':'<'};
    let pointsMap = {'(': 1, '[': 2, '{': 3, '<': 4};
    let r = [];

    outer:
    for(let line of lines) {
        let open = [];
        for(let c of line) {
            if(c in opening) {
                if(open.pop() != opening[c]) continue outer;
            } else {
                open.push(c);
            }
        }
        // will get here only if incomplete
        r.push(open
            .reverse()
            .map(b => pointsMap[b])
            .reduce((acc, cur) => 5*acc + cur, 0)
        );
    }

    console.log(
        r.sort((a, b) => a-b)[r.length/2-.5]
    );
})();
