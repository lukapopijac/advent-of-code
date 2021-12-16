const fs = require('fs');
const { join } = require('path/posix');
let f = fs.readFileSync('input.txt', 'utf8');
let a = f
    .trim()
    .split('\n')
    .map(line => line.split('').map(x => +x))
;


// part 1

function getMin(nodes) {  // very inefficient, but good enough
    let [m, n] = [nodes.length, nodes[0].length];
    let min = Infinity;
    let bestI = -1, bestJ;
    for(let i=0; i<m; i++) {
        for(let j=0; j<n; j++) {
            let node = nodes[i][j];
            if(!node.visited && node.distance < min) {
                min = node.distance;
                bestI = i;
                bestJ = j;
            }
        }
    }
    return bestI > -1 ? nodes[bestI][bestJ] : null;
}

(_ => {
    let [m, n] = [a.length, a[0].length];

    let nodes = Array(m)
        .fill(1)
        .map((_, i) => Array(n)
            .fill(1)
            .map((_, j) => ({
                i,
                j,
                distance: Infinity,
                prev: null,
                visited: false,
            }))
        )
    ;

    nodes[0][0].distance = 0;

    let u;
    while(u = getMin(nodes)) {
        u.visited = true;

        let neighbors = [
            nodes[u.i-1]?.[u.j],
            nodes[u.i+1]?.[u.j],
            nodes[u.i]?.[u.j-1],
            nodes[u.i]?.[u.j+1],
        ].filter(x => x);

        // console.log(u.i, u.j, u.distance, neighbors.map(ne=> [ne.i, ne.j]))


        for(let v of neighbors) {
            if(u.distance + a[v.i][v.j] < v.distance) {
                v.distance = u.distance + a[v.i][v.j];
                v.prev = u;
            }
        }
    }

    console.log(nodes[m-1][n-1].distance);
})();
