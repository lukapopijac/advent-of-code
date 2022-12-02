const fs = require('fs');
let f = fs.readFileSync('input.txt', 'utf8');
let edges = f
    .trim()
    .split('\n')
    .map(edge => edge.split('-'))
;

let neighbors = {};
for(let [a, b] of edges) {
    if(!(a in neighbors)) neighbors[a] = new Set();
    if(!(b in neighbors)) neighbors[b] = new Set();
    if(b!='start') neighbors[a].add(b);
    if(a!='start') neighbors[b].add(a);
}


// part 1

(_ => {
    let cnt = 0;
    let visited = new Set();  // only to contain small caves
    function search(node) {
        if(node == 'end') cnt++;
        else {
            if(visited.has(node)) return;
            if(node == node.toLowerCase()) visited.add(node);
            for(let n of neighbors[node]) search(n);
            visited.delete(node);
        }
    }
    search('start');
    console.log(cnt);
})();


// part 2

(_ => {
    let cnt = 0;
    let visited = new Set();  // only to contain small caves
    let doubleVisited = null;
    function search(node) {
        if(node == 'end') cnt++;
        else {
            if(doubleVisited && visited.has(node)) return;
            if(node == node.toLowerCase()) {
                if(visited.has(node)) doubleVisited = node;
                else visited.add(node);
            }
            for(let n of neighbors[node]) search(n);
            if(node == doubleVisited) doubleVisited = null;
            else visited.delete(node);
        }
    }
    search('start');
    console.log(cnt);
})();
