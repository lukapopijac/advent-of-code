let f = await Deno.readTextFile('./input.txt');
let lines = f
	.trim()
	.split('\n')
;

(_ => {
	let elves = [];
	let sum = 0;
	for(let line of lines) {
		if(line == '') {
			elves.push(sum);
			sum = 0;
		} else {
			sum += +line;
		}
	}
	elves.sort((a, b) => b-a)

	// part 1
	console.log(elves[0]);

	// part 2
	console.log(elves[0] + elves[1] + elves[2]);
})();
