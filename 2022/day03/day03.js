let f = await Deno.readTextFile('./input.txt');
let lines = f
	.trim()
	.split('\n')
;

let items = '_abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';


// part 1

function findCommonChar2(s1, s2) {
	let set1 = new Set(s1);
	return [...s2].find(c => set1.has(c));
}

(_ => {
	let s = 0;	
	for(let line of lines) {
		let r1 = line.slice(0, line.length/2);
		let r2 = line.slice(line.length/2);
		let c = findCommonChar2(r1, r2);
		s += items.indexOf(c);
	}
	console.log(s)
})();



// part 2

function findCommonChar3(s1, s2, s3) {
	let set1 = new Set(s1);
	let set2 = new Set(s2);
	return [...s3].find(c => set1.has(c) && set2.has(c));
}

(_ => {
	let s = 0;	
	let i = 0;
	while(i < lines.length) {
		let s1 = lines[i++];
		let s2 = lines[i++];
		let s3 = lines[i++];
		let c = findCommonChar3(s1, s2, s3);
		s += items.indexOf(c);
	}
	console.log(s)
})();
