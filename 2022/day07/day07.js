let f = await Deno.readTextFile('./input1.txt');
let lines = f
	.trim()
	.split('\n')
;


function currentDir(h, path) {
	let c = h;
	for(let p of path) {
		c = c.dirs[p];
	}
	return c;
}


let newDir = _ => ({dirs: {}, files: {}});

(_ => {
	let path = [];
	let h = newDir();
	for(let i=0; i<lines.length; i++) {
		let line = lines[i];
		if(line == '$ ls') {
			let cur = currentDir(h, path);
			while(true) {
				let s = lines[++i];
				if(!s) break;
				if(s.startsWith('$')) break;
				if(s.startsWith('dir')) cur.dirs[s.split(' ')[1]] = newDir();
				else {
					let [size, name] = s.split(' ');
					cur.files[name] = +size;
				}
			}
			i--;
			// console.log('cur end =', cur)
		} else if(line == '$ cd /') {
			path.length = 0;
		} else if(line == '$ cd ..') {
			path.pop();
		} else if(line.startsWith('$ cd')) {
			path.push(line.split(' ')[2]);
		}
	}

	
	// part 1
	
	let ret1 = 0;

	function getSizes(h) {
		h.size = 0;
		for(let file in h.files) h.size += h.files[file];
		for(let dir in h.dirs) {
			h.size += getSizes(h.dirs[dir]);
		}
		if(h.size <= 100000) ret1 += h.size;
		return h.size;
	}

	getSizes(h);

	console.log(ret1);


	// part 2

	let goal = h.size - 40e6;
	let ret2 = Infinity;

	function findDir(h) {
		if(h.size >= goal && h.size < ret2) ret2 = h.size;
		for(let dir in h.dirs) {
			findDir(h.dirs[dir]);
		}
	}

	findDir(h);

	console.log(ret2);
})();
