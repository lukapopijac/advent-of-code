let f = await Deno.readTextFile('./input.txt');
let steps = f
    .trim()
    .split('\n')
    .map(line => line.match(/(on|off) x=(.*)\.\.(.*),y=(.*)\.\.(.*),z=(.*)\.\.(.*)/))
    .map(m => [m[1] == 'on' ? 1 : 0, +m[2], +m[3], +m[4], +m[5], +m[6], +m[7]])
;


// part 1

(_ => {
    run(50);
})();


// part 2 (runs about 30 s)

(_ => {
    run(Infinity);
})();




function setBits(n, b, i1, i2) {
    i1 = BigInt(i1);
    i2 = BigInt(i2);
    let m = ((1n<<(i2-i1))-1n)<<i1;
    return b ? n|m : n&~m;
}

function run(limit) {
    let extractedSteps = steps.filter(([b, x1, x2, y1, y2, z1, z2]) =>
        x1>=-limit && x2<=limit && y1>=-limit && y2<=limit && z1>=-limit && z2<=limit
    );

    let xBreaksSet = new Set();
    let yBreaksSet = new Set();
    let zBreaksSet = new Set();
    for(let [b, x1, x2, y1, y2, z1, z2] of extractedSteps) {
        xBreaksSet.add(x1); xBreaksSet.add(x2+1);
        yBreaksSet.add(y1); yBreaksSet.add(y2+1);
        zBreaksSet.add(z1); zBreaksSet.add(z2+1);
    }
    let xBreaks = [...xBreaksSet].sort((a, b) => a - b);
    let yBreaks = [...yBreaksSet].sort((a, b) => a - b);
    let zBreaks = [...zBreaksSet].sort((a, b) => a - b);
    
    let xBreaksIdx = {};
    let yBreaksIdx = {};
    let zBreaksIdx = {};
    for(let i=0; i<xBreaks.length; i++) xBreaksIdx[xBreaks[i]] = i;
    for(let i=0; i<yBreaks.length; i++) yBreaksIdx[yBreaks[i]] = i;
    for(let i=0; i<zBreaks.length; i++) zBreaksIdx[zBreaks[i]] = i;

    
    let matrix = Array(xBreaks.length).fill(0).map(
        _ => Array(yBreaks.length).fill(0n)
    );

    for(let [b, x1, x2, y1, y2, z1, z2] of extractedSteps) {
        let xi1 = xBreaksIdx[x1];
        let xi2 = xBreaksIdx[x2+1];
        for(let xi=xi1; xi<xi2; xi++) {
            let yi1 = yBreaksIdx[y1];
            let yi2 = yBreaksIdx[y2+1];
            for(let yi=yi1; yi<yi2; yi++) {
                let zi1 = zBreaksIdx[z1];
                let zi2 = zBreaksIdx[z2+1];
                matrix[xi][yi] = setBits(matrix[xi][yi], b, zi1, zi2);
            }
        }
    }

    let volume = 0;
    for(let xi=0; xi<xBreaks.length-1; xi++) {
        let w = 0;
        for(let yi=0; yi<yBreaks.length-1; yi++) {
            let v = 0;
            let m = matrix[xi][yi];
            for(let zi=0; m; zi++) {
                if(m&1n) v += zBreaks[zi+1]-zBreaks[zi];
                m >>= 1n;
            }
            w += v*(yBreaks[yi+1]-yBreaks[yi]);
        }
        volume += w*(xBreaks[xi+1]-xBreaks[xi]);
    }
    console.log(volume);
}
