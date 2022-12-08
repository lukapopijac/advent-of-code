let f = await Deno.readTextFile('./input1.txt');
let lines = f
	.trim()
	.split('\n')
	.map(line => line.split('')
		.map(r => +r)
	)
;


// part 1

(_ => {
	let a = lines;
	let b = a.map(x => Array(x.length).fill(0))
	let [n, m] = [a.length, a[0].length];

	for(let i=0; i<n; i++) {
		let best = -1;
		for(let j=0; j<m; j++) {
			if(a[i][j]<=best) continue;
			b[i][j] = 1;
			best = a[i][j];
		}
	}

	for(let i=0; i<n; i++) {
		let best = -1;
		for(let j=m-1; j>=0; j--) {
			if(a[i][j]<=best) continue;
			b[i][j] = 1;
			best = a[i][j];
		}
	}

	for(let j=0; j<m; j++) {
		let best = -1;
		for(let i=0; i<n; i++) {
			if(a[i][j]<=best) continue;
			b[i][j] = 1;
			best = a[i][j];
		}
	}

	for(let j=0; j<m; j++) {
		let best = -1;
		for(let i=n-1; i>=0; i--) {
			if(a[i][j]<=best) continue;
			b[i][j] = 1;
			best = a[i][j];
		}
	}

	let sum = 0;
	for(let i=0; i<n; i++) for(let j=0; j<m; j++) sum += b[i][j];
	console.log(sum);
})();




// part 2

(_ => {
	let a = lines;
	let [n, m] = [a.length, a[0].length];

	let best = 0;
	for(let i=0; i<n; i++) {
		for(let j=0; j<m; j++) {
			let p = 1;
			let cnt;
			
			cnt = 0;
			for(let k=i-1; k>=0; k--) {
				cnt++;
				if(a[k][j] >= a[i][j]) break;
			}
			p *= cnt;

			cnt = 0;
			for(let k=i+1; k<n; k++) {
				cnt++;
				if(a[k][j] >= a[i][j]) break;
			}
			p *= cnt;
			
			cnt = 0;
			for(let k=j-1; k>=0; k--) {
				cnt++;
				if(a[i][k] >= a[i][j]) break;
			}
			p *= cnt;

			cnt = 0;
			for(let k=j+1; k<m; k++) {
				cnt++;
				if(a[i][k] >= a[i][j]) break;
			}
			p *= cnt;
			
			if(p > best) best = p;
		}
	}
	console.log(best);
})();

