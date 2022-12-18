let f = await Deno.readTextFile('./input1.txt');
let input = f
	.trim()
	.split('\n')
	.map(line => line
		.trim()
		.split(',')
		.map(t => +t)
	)
;


// part 1

(_ => {
	let [xMax, yMax, zMax] = [0, 0, 0];
	for(let [x, y, z] of input) {
		if(x > xMax) xMax = x;
		if(y > yMax) yMax = y;
		if(z > zMax) zMax = z;
	}

	let lava = Array(xMax+1).fill(0)
		.map(_ => Array(yMax+1).fill(0)
			.map(_ => Array(zMax+1).fill(0))
		)
	;
	
	for(let [x, y, z] of input) lava[x][y][z] = 1;

	let s = 0;
	for(let x=0; x<=xMax; x++) {
		for(let y=0; y<=yMax; y++) {
			for(let z=0; z<=zMax; z++) {
				if(lava[x][y][z]) {
					s += 6;
					if(x>0    && lava[x-1][y][z]) s--;
					if(x<xMax && lava[x+1][y][z]) s--;
					if(y>0    && lava[x][y-1][z]) s--;
					if(y<yMax && lava[x][y+1][z]) s--;
					if(z>0    && lava[x][y][z-1]) s--;
					if(z<zMax && lava[x][y][z+1]) s--;
				}
			}
		}
	}

	console.log(s);
})();


// part 2

(_ => {
	let [xMax, yMax, zMax] = [0, 0, 0];
	for(let [x, y, z] of input) {
		if(x > xMax) xMax = x;
		if(y > yMax) yMax = y;
		if(z > zMax) zMax = z;
	}

	let lava = Array(xMax+3).fill(0)
		.map(_ => Array(yMax+3).fill(0)
			.map(_ => Array(zMax+3).fill(0))
		)
	;
	
	for(let [x, y, z] of input) lava[x+1][y+1][z+1] = 1;

	// fill everything outside with 2's
	(function fill(x, y, z) {
		lava[x][y][z] = 2;
		if(x>0      && lava[x-1][y][z]==0) fill(x-1, y, z);
		if(x<xMax+2 && lava[x+1][y][z]==0) fill(x+1, y, z);
		if(y>0      && lava[x][y-1][z]==0) fill(x, y-1, z);
		if(y<yMax+2 && lava[x][y+1][z]==0) fill(x, y+1, z);
		if(z>0      && lava[x][y][z-1]==0) fill(x, y, z-1);
		if(z<zMax+2 && lava[x][y][z+1]==0) fill(x, y, z+1);
	})(0, 0, 0);

	let s = 0;
	for(let x=0; x<=xMax+2; x++) {
		for(let y=0; y<=yMax+2; y++) {
			for(let z=0; z<=zMax+2; z++) {
				if(lava[x][y][z] == 2) {
					s += 6;
					if(x>0      && lava[x-1][y][z] == 2) s--;
					if(x<xMax+2 && lava[x+1][y][z] == 2) s--;
					if(y>0      && lava[x][y-1][z] == 2) s--;
					if(y<yMax+2 && lava[x][y+1][z] == 2) s--;
					if(z>0      && lava[x][y][z-1] == 2) s--;
					if(z<zMax+2 && lava[x][y][z+1] == 2) s--;
				}
			}
		}
	}

	// subtract surface area of the whole space
	console.log(s - 2*((xMax+3)*(yMax+3) + (xMax+3)*(zMax+3) + (yMax+3)*(zMax+3)))
})();
