let f = await Deno.readTextFile('./input.txt');
let lines = f
	.trim()
	.split('\n')
	.map(line => line.split(/,|-/)
		.map(r => +r)
	)
;


// part 1

(_ => {
	let cnt = 0;
	for(let r of lines) {
		if(r[0]<=r[2] && r[1]>=r[3] || r[0]>=r[2] && r[1]<=r[3]) cnt++;
	}
	console.log(cnt);
})();


// part 2

(_ => {
	let cnt = 0;
	for(let r of lines) {
		if(r[0]<=r[3] && r[1]>=r[2] || r[1]>=r[2] && r[3]>=r[0]) cnt++;
	}
	console.log(cnt);
})();
