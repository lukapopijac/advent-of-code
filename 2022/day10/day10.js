let f = await Deno.readTextFile('./input1.txt');
let lines = f
	.trim()
	.split('\n')
;
let input = lines.map(line => {
	if(line=='noop') return 0;
	return [0, +line.split(' ')[1]]
}).flat();


// part 1

(_ => {
	let s = 1;
	let r = 0;
	for(let i=0; i<input.length; i++) {
		if(i%40==19) r += (i+1) * s;
		s += input[i];
	}
	console.log(r);

})();


// part 2

(_ => {
	let crt = [1,1,1,1,1,1].map(x => Array(40).fill('.'));
	let s = 1;
	for(let i=0; i<input.length; i++) {
		let y = i/40|0;
		let x = i%40;
		// console.log(i, s);
		if(x==s || x==s-1 || x==s+1) crt[y][x] = '#';
		s += input[i];
	}
	console.log(crt.map(line => line.join('')));
})();
