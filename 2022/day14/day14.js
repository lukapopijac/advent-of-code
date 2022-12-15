let f = await Deno.readTextFile('./input1.txt');
let input = f
	.trim()
	.split('\n')
	.map(line => line
		.trim()
		.split(' -> ')
		.map(coords => coords
			.split(',')
			.map(x => +x)
		)
	)
;

function createCave() {
	let [maxX, maxY] = [0, 0];
	for(let path of input) {
		for(let [x, y] of path) {
			if(x > maxX) maxX = x;
			if(y > maxY) maxY = y;
		}
	}
	
	let cave = [];
	for(let i=0; i<=maxY; i++) {
		cave[i] = Array(maxX+1).fill(0);
	}

	for(let path of input) {
		for(let i=0; i<path.length-1; i++) {
			let [x0, y0] = path[i];
			let [x1, y1] = path[i+1];
			if(x0 == x1) {
				if(y0>y1) [y0, y1] = [y1, y0];
				for(let j=y0; j<=y1; j++) cave[j][x0] = 1;
			} else if(y0 == y1) {
				if(x0>x1) [x0, x1] = [x1, x0];
				for(let j=x0; j<=x1; j++) cave[y0][j] = 1;
			}
		}
	}

	cave.toString = function() {
		return this.map(p => p.map(t => t==0 ? ' ' : t==1 ? '#' : 'o').join('')).join('\n')
	}
	return cave;
}


// part 1

(_ => {
	function drop(x, y, cave) {
		if(y>=cave.length-1) return [-1, -1];
		if(cave[y+1][x] == 0) return drop(x, y+1, cave);
		if(cave[y+1][x-1] == 0) return drop(x-1, y+1, cave);
		if(cave[y+1][x+1] == 0) return drop(x+1, y+1, cave);
		return [x, y];
	}
	
	let cave = createCave();
	// Deno.writeTextFile('out.txt', cave);

	for(let i=0;; i++) {
		let [x, y] = drop(500, 0, cave);
		if(x==-1) {
			console.log(i);
			break;
		}
		cave[y][x] = 2;
		// Deno.writeTextFile('out.txt', cave, {append: true});
	}
})();


// part 2

(_ => {
	function drop(x, y, cave) {
		if(y>=cave.length-1) return [x, y];
		if(cave[y+1][x] == 0) return drop(x, y+1, cave);
		if(cave[y+1][x-1] == 0) return drop(x-1, y+1, cave);
		if(cave[y+1][x+1] == 0) return drop(x+1, y+1, cave);
		return [x, y];
	}

	let cave = createCave();
	cave.push(Array(cave[0].length).fill(0));
	for(let line of cave) line.push(...Array(500).fill(0));
	// Deno.writeTextFile('out.txt', cave);

	for(let i=0;; i++) {
		let [x, y] = drop(500, 0, cave);
		if(y==0 && cave[y][x]==2) {
			console.log(i);
			break;
		}
		cave[y][x] = 2;
		// Deno.writeTextFile('out.txt', cave, {append: true});
	}
})();
