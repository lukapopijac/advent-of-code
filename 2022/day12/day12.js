let f = await Deno.readTextFile('./input1.txt');
let elevations = 'abcdefghijklmnopqrstuvwxyz';


function extractMinDist(nodesSet) {
	let best = {dist: Infinity};
	let nodes = [...nodesSet];
	for(let node of nodes) {
		if(node.dist < best.dist) best = node;
	}
	nodesSet.delete(best);
	return best;
}

function getNeighbours(node, map) {
	let ret = [];
	if(node.i > 0) ret.push(map[node.i-1][node.j]);
	if(node.i < map.length-1) ret.push(map[node.i+1][node.j]);
	if(node.j > 0) ret.push(map[node.i][node.j-1]);
	if(node.j < map[0].length-1) ret.push(map[node.i][node.j+1]);
	return ret;
}


// part 1

(_ => {
	let startNode = null;
	let endNode = null;
	let map = f
		.trim()
		.split('\n')
		.map(line => line.split('').map(c => {
			if(c=='S') return startNode = {h: 0, dist: 0};
			if(c=='E') return endNode = {h: 25, dist: 1e4};
			return {h: elevations.indexOf(c), dist: 1e4};
		}))
	;
	
	for(let i=0; i<map.length; i++) {
		for(let j=0; j<map[i].length; j++) {
			map[i][j].i = i;
			map[i][j].j = j;
		}
	}


	let visited = new Set();
	let fringe = new Set([startNode]);
	while(fringe.size > 0) {
		let node = extractMinDist(fringe);
		if(node == endNode) break;
		visited.add(node);
		
		let neighbours = getNeighbours(node, map);
		for(let n of neighbours) {
			if(visited.has(n)) continue;
			if(node.h + 1 >= n.h) {
				fringe.add(n);
				if(node.dist + 1 < n.dist) n.dist = node.dist + 1;
			}
		}
	}

	console.log(endNode.dist)

	// console.log(map.map(a => a.map(x => x.dist).join(' ')));
})();


// part 2

(_ => {
	// reverse startNode and endNode. now there are multiple endNodes.
	let startNode = null;
	let endNodes = new Set();
	let map = f
		.trim()
		.split('\n')
		.map(line => line.split('').map(c => {
			if(c=='S' || c=='a') {
				let node = {h: 0, dist: 1e4};
				endNodes.add(node);
				return node;
			}
			if(c=='E') return startNode = {h: 25, dist: 0};
			return {h: elevations.indexOf(c), dist: 1e4};
		}))
	;

	for(let i=0; i<map.length; i++) {
		for(let j=0; j<map[i].length; j++) {
			map[i][j].i = i;
			map[i][j].j = j;
		}
	}

	let visited = new Set();
	let fringe = new Set([startNode]);
	while(fringe.size > 0) {
		let node = extractMinDist(fringe);
		if(endNodes.has(node)) {
			console.log(node.dist);
			break;
		}
		visited.add(node);
		
		let neighbours = getNeighbours(node, map);
		for(let n of neighbours) {
			if(visited.has(n)) continue;
			if(node.h - 1 <= n.h) {
				fringe.add(n);
				if(node.dist + 1 < n.dist) n.dist = node.dist + 1;
			}
		}
	}

	// console.log(map.map(a => a.map(x => x.dist).join(' ')));

})();
