let f = await Deno.readTextFile('./input.txt');
let input = f
    .trim()
    .split('\n\n')
;

let scanners = [];
for(let scannerInput of input) {
    scanners.push(new Set(scannerInput
        .replace(/--- scanner \d+ ---\n/, '')
        .split('\n')
    ));
}

const rotationMatrices = [
    [ [ 1, 0, 0 ], [ 0, 1, 0 ], [ 0, 0, 1 ] ],
    [ [ 1, 0, 0 ], [ 0, 0, -1 ], [ 0, 1, 0 ] ],
    [ [ 1, 0, 0 ], [ 0, -1, 0 ], [ 0, 0, -1 ] ],
    [ [ 1, 0, 0 ], [ 0, 0, 1 ], [ 0, -1, 0 ] ],
    [ [ 0, 0, 1 ], [ 0, 1, 0 ], [ -1, 0, 0 ] ],
    [ [ 0, 1, 0 ], [ 0, 0, -1 ], [ -1, 0, 0 ] ],
    [ [ 0, 0, -1 ], [ 0, -1, 0 ], [ -1, 0, 0 ] ],
    [ [ 0, -1, 0 ], [ 0, 0, 1 ], [ -1, 0, 0 ] ],
    [ [ -1, 0, 0 ], [ 0, 1, 0 ], [ 0, 0, -1 ] ],
    [ [ -1, 0, 0 ], [ 0, 0, -1 ], [ 0, -1, 0 ] ],
    [ [ -1, 0, 0 ], [ 0, -1, 0 ], [ 0, 0, 1 ] ],
    [ [ -1, 0, 0 ], [ 0, 0, 1 ], [ 0, 1, 0 ] ],
    [ [ 0, 0, -1 ], [ 0, 1, 0 ], [ 1, 0, 0 ] ],
    [ [ 0, -1, 0 ], [ 0, 0, -1 ], [ 1, 0, 0 ] ],
    [ [ 0, 0, 1 ], [ 0, -1, 0 ], [ 1, 0, 0 ] ],
    [ [ 0, 1, 0 ], [ 0, 0, 1 ], [ 1, 0, 0 ] ],
    [ [ 0, -1, 0 ], [ 1, 0, 0 ], [ 0, 0, 1 ] ],
    [ [ 0, 0, 1 ], [ 1, 0, 0 ], [ 0, 1, 0 ] ],
    [ [ 0, 1, 0 ], [ 1, 0, 0 ], [ 0, 0, -1 ] ],
    [ [ 0, 0, -1 ], [ 1, 0, 0 ], [ 0, -1, 0 ] ],
    [ [ 0, -1, 0 ], [ -1, 0, 0 ], [ 0, 0, -1 ] ],
    [ [ 0, 0, 1 ], [ -1, 0, 0 ], [ 0, -1, 0 ] ],
    [ [ 0, 1, 0 ], [ -1, 0, 0 ], [ 0, 0, 1 ] ],
    [ [ 0, 0, -1 ], [ -1, 0, 0 ], [ 0, 1, 0 ] ]
];


let unpackScanner = scanner => [...scanner].map(beacon => beacon.split(',').map(x => +x));
let subtract = (x, y) => [x[0] - y[0], x[1] - y[1], x[2] - y[2]];
let dotProduct = (x, y) => x[0]*y[0] + x[1]*y[1] + x[2]*y[2];
let transform = (A, x) => [dotProduct(A[0], x), dotProduct(A[1], x), dotProduct(A[2], x)];
let manhattanDistance = (x, y) => Math.abs(x[0]-y[0]) + Math.abs(x[1]-y[1]) + Math.abs(x[2]-y[2]);


function merge(scanner1, scanner2) { 
    // if two scanners can merge, merge scanner2 into scanner1 and return their distance
    let s1 = unpackScanner(scanner1);
    let s2 = unpackScanner(scanner2);
    for(let R of rotationMatrices) {
        let s2r = s2.map(beacon => transform(R, beacon));  // rotate beacons in scanner2
        let translations = {};
        for(let beacon1 of s1) for(let beacon2 of s2r) {
            let d = subtract(beacon2, beacon1);
            let k = d.join(',');
            if(!translations[k]) translations[k] = 0;
            translations[k]++;
            if(translations[k] == 12) {
                // merge
                for(let beacon of s2r) scanner1.add(subtract(beacon, d).join(','));
                return d;
            }
        }
    }
}


// part 1

let translations = Array(scanners.length).fill(0).map(_ => []);
loop:
while(scanners.some((s, idx) => s && idx)) {
    for(let i=0; i<scanners.length-1; i++) {
        if(!scanners[i]) continue;
        for(let j=i+1; j<scanners.length; j++) {
            if(!scanners[j]) continue;
            let d = merge(scanners[i], scanners[j]);
            if(d) {
                scanners[j] = null;
                translations[i][j] = d;  // needed for part 2
                continue loop;
            }
        }
    }
}

// part 1

console.log(scanners[0].size);


// part 2

// happily all scanners merged directly with scanner 0, so the following code is simpler
translations[0][0] = [0, 0, 0];
let positions = translations[0];  // positions of scanners relative to scanner 0

let m = 0;
for(let i=0; i<positions.length-1; i++) {
    for(let j=i+1; j<positions.length; j++) {
        let d = manhattanDistance(positions[i], positions[j]);
        if(d>m) m = d;
    }
}
console.log(m);
