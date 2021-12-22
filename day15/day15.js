const fs = require('fs');
let f = fs.readFileSync('input.txt', 'utf8');
let a = f
    .trim()
    .split('\n')
    .map(line => line.split('').map(x => +x))
;


function findMin(queue) {
    let minNode = {distance: Infinity};
    for(let node of queue) {
        if(node.distance < minNode.distance) {
            minNode = node;
        }
    }
    return minNode;
}

function dijkstra(startNode) {
    startNode.distance = 0;
    let queue = new Set([startNode]);
    while(queue.size > 0) {
        let u = findMin(queue);
        queue.delete(u);
        u.visited = true;
        for(let v of u.neighbors) {
            if(u.distance + v.value < v.distance) {
                v.distance = u.distance + v.value;
                v.prev = u;
                queue.add(v);
            }
        }
    }
}

function addNeighbors(nodes) {
    let [m, n] = [nodes.length, nodes[0].length];
    for(let i=0; i<m; i++) {
        for(let j=0; j<n; j++) {
            nodes[i][j].neighbors = [
                nodes[i-1]?.[j],
                nodes[i+1]?.[j],
                nodes[i]?.[j-1],
                nodes[i]?.[j+1],
            ].filter(x => x);
        }
    }
}


// part 1

(_ => {
    let [m, n] = [a.length, a[0].length];
    let nodes = Array(m)
        .fill(1)
        .map((_, i) => Array(n)
            .fill(1)
            .map((_, j) => ({
                distance: Infinity,
                prev: null,
                visited: false,
                value: a[i][j]
            }))
        )
    ;
    addNeighbors(nodes);
    dijkstra(nodes[0][0]);
    console.log(nodes[m-1][n-1].distance);
})();


// part 2

(_ => {
    let [m, n] = [a.length, a[0].length];
    let nodes = Array(5*m)
        .fill(1)
        .map((_, i) => Array(5*n)
            .fill(1)
            .map((_, j) => ({
                distance: Infinity,
                prev: null,
                visited: false,
                value: (a[i%m][j%n] + (i/m|0) + (j/n|0) - 1)%9 + 1
            }))
        )
    ;

    addNeighbors(nodes);
    dijkstra(nodes[0][0]);
    console.log(nodes[5*m-1][5*n-1].distance);
})();
