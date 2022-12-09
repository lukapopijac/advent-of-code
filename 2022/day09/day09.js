let f = await Deno.readTextFile('./input1.txt');
let lines = f
	.trim()
	.split('\n')
	.map(line => {
		let [dir, s] = line.split(' ');
		if(dir=='R') return [ 1,  0, +s];
		if(dir=='L') return [-1,  0, +s];
		if(dir=='D') return [ 0, -1, +s];
		if(dir=='U') return [ 0,  1, +s];
	})
;



// part 1

(_ => {
	let head = {x:0, y:0};
	let tail = {x:0, y:0};
	let visited = new Set(['0 0']);

	for(let [stepX, stepY, steps] of lines) {
		for(let i=0; i<steps; i++) {
			head.x += stepX;
			head.y += stepY;
			let [dx, dy] = [head.x-tail.x, head.y-tail.y];
			if(dx*dx + dy*dy <= 2) continue;
			tail.x += Math.sign(dx);
			tail.y += Math.sign(dy);
			visited.add(tail.x + ' ' + tail.y);
		}
	}
	console.log(visited.size);
})();


// part 2

(_ => {
	let knots = [];
	for(let i=0; i<10; i++) knots.push({x:0, y:0});
	let visited = new Set(['0 0']);

	for(let [stepX, stepY, steps] of lines) {
		for(let i=0; i<steps; i++) {
			knots[0].x += stepX;
			knots[0].y += stepY;
			for(let j=1; j<10; j++) {
				let dx = knots[j-1].x - knots[j].x;
				let dy = knots[j-1].y - knots[j].y;
				if(dx*dx + dy*dy <= 2) continue;
				knots[j].x += Math.sign(dx);
				knots[j].y += Math.sign(dy);
				visited.add(knots[9].x + ' ' + knots[9].y);
			}
		}
	}
	console.log(visited.size);
})();
