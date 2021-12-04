const fs = require('fs');
let f = fs.readFileSync('input.txt', 'utf8');
let a = f
    .trim()
    .split('\n\n')
;

let numbers = a[0]
    .trim()
    .split(',')
    .map(y => +y)
;

let boards = a
    .slice(1)
    .map(
        b => b
            .trim()
            .replaceAll('  ', ' ')
            .split('\n')
            .map(
                line => line
                    .trim()
                    .split(' ')
                    .map(x => +x)
            )
    )
;

let allMasks = [];
for(let board of boards) {
    let boardMasks = [0n, 0n, 0n, 0n, 0n, 0n, 0n, 0n, 0n, 0n];
    for(let i=0; i<5; i++) {
        for(let j=0; j<5; j++) {
            let m = 1n << BigInt(board[i][j]);
            boardMasks[i] |= m;
            boardMasks[j+5] |= m;
        }
    }
    allMasks.push(boardMasks);
}

function getScore(board, drawNumbers) {
    let set = new Set(board.flat());
    for(let number of drawNumbers) set.delete(number);
    let sum = 0;
    for(let x of [...set]) sum += x;
    return sum * drawNumbers[drawNumbers.length-1];
}


// part 1

(_ => {
    let drawMask = 0n;
    let idx, i;
    for(i=0; i<numbers.length; i++) {
        drawMask |= 1n << BigInt(numbers[i]);
        idx = allMasks.findIndex(boardMasks =>
            boardMasks.some(mask => 
                (mask & drawMask) == mask
            )
        );
        if(idx>=0) break;
    }

    console.log(
        getScore(boards[idx], numbers.slice(0, i+1))
    );
})();


// part 2

(_ => {
    let allMasksCopy = allMasks.slice(0);
    let drawMask = 0n;
    let i;
    let lastBoardMasks;
    for(i=0; i<numbers.length; i++) {
        drawMask |= 1n << BigInt(numbers[i]);
        allMasksCopy = allMasksCopy.filter(boardMasks =>
            boardMasks.every(mask => 
                (mask & drawMask) != mask
            )
        );
        if(allMasksCopy.length == 1) lastBoardMasks = allMasksCopy[0];
        if(allMasksCopy.length < 1) break;    
    }
    let idx = allMasks.findIndex(boardMasks => boardMasks == lastBoardMasks);

    console.log(
        getScore(boards[idx], numbers.slice(0, i+1))
    );
})();
