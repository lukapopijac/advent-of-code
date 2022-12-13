let f = await Deno.readTextFile('./input1.txt');
let [inputStacks, inputMoves] = f
	.split('\n\n')
;


function getStacks() {
	let n = +inputStacks.split('\n').pop().trim().split(' ').pop();
	let levels = inputStacks.split('\n').reverse().slice(1);
	let stacks = Array(n).fill(1).map(_ => []);
	for(let level of levels) {
		let lev = level.match(/.{1,4}/g).map(x => x[1]);
		for(let i=0; i<lev.length; i++) if(lev[i] != ' ') stacks[i].push(lev[i]);
	}
	return stacks;
}

function executeMoves(stacks, moves, shouldReverse) {
	for(let move of moves) {
		let [m, i1, i2] = move.match(/\d+/g).map(x => +x);
		let [s1, s2] = [stacks[i1-1], stacks[i2-1]];
		let t = s1.slice(-m);
		if(shouldReverse) t = t.reverse();
		s1.length -= m;
		s2.push(...t);
	}
}

let moves = inputMoves.trim().split('\n');


// part 1

(_ => {
	let stacks = getStacks();
	executeMoves(stacks, moves, true);
	console.log(stacks.map(s => s.pop()).join(''));
})();


// part 2

(_ => {
	let stacks = getStacks();
	executeMoves(stacks, moves, false);
	console.log(stacks.map(s => s.pop()).join(''));
})();
