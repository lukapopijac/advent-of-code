let f = await Deno.readTextFile('./input1.txt');
let input = f
	.trim()
	.split('\n\n')
	.map(pair => pair
		.split('\n')
		.map(JSON.parse)
	)
;


function compare(p1, p2) {
	if(p1 == null && p2 == null) return 0;
	if(p1 == null) return -1;
	if(p2 == null) return 1;

	let isa1 = Array.isArray(p1);
	let isa2 = Array.isArray(p2);

	if(!isa1 && !isa2) return Math.sign(p1 - p2);
	if(isa1 && !isa2) return compare(p1, [p2]);
	if(!isa1 && isa2) return compare([p1], p2);

	for(let i=0; i<=p1.length && i<=p2.length; i++) {
		let c = compare(p1[i], p2[i]);
		if(c!=0) return c;
	}

	return 0;
}



// part 1

(_ => {
	let s = 0;
	for(let i=0; i<input.length; i++) {
		let [p1, p2] = input[i];
		if(compare(p1, p2) == -1) s += i+1;
	}
	console.log(s);
})();


// part 2

(_ => {
	let list = input.flat(1);
	let a = [[2]];
	let b = [[6]];
	list.push(a, b)
	list.sort(compare);
	let i = list.findIndex(x => x==a);
	let j = list.findIndex(x => x==b);
	console.log((i+1)*(j+1));
})();
