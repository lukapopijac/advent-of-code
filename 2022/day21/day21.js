// not solved

let f = await Deno.readTextFile('./input1.txt');
let input = f
	.trim()
	.split('\n')
;


function getNodes(input) {
	let nodes = {};
	for(let line of input) {
		let monkey = line.split(':')[0];
		let operation = 
			line.includes('+') ? (a, b) => a + b : 
			line.includes('-') ? (a, b) => a - b : 
			line.includes('*') ? (a, b) => a * b : 
			line.includes('/') ? (a, b) => a / b : 
			null
		;
		let left = null;
		let right = null;
		let value = null;
		if(operation) {
			let a = line.split(':')[1].split(' ');
			left = a[1];
			right = a[3];
		} else {
			value = +line.split(':')[1];
		}
		nodes[monkey] = {operation, left, right, value};
	}

	for(let m in nodes) {
		nodes[m].leftMonkey = nodes[nodes[m].left];
		nodes[m].rightMonkey = nodes[nodes[m].right];
	}

	return nodes;
}

function calculate(monkey) {
	if(monkey.value != null) return monkey.value;
	let leftValue = calculate(monkey.leftMonkey);
	let rightValue = calculate(monkey.rightMonkey);
	return monkey.operation(leftValue, rightValue);
}


// part 1

(_ => {
	let nodes = getNodes(input);
	console.log(calculate(nodes.root));
})();


// part 2

(_ => {
	let nodes = getNodes(input);
	let leftMonkey = nodes.root.leftMonkey;
	let rightMonkey = nodes.root.rightMonkey;

	let a = Number.MIN_SAFE_INTEGER/10;
	let b = Number.MAX_SAFE_INTEGER/10;
	while(a < b) {
		let val = Math.round((a+b)/2);
		nodes.humn.value = val;
		let leftValue = calculate(leftMonkey);
		let rightValue = calculate(rightMonkey);
		
		if(leftValue == rightValue) {
			console.log(val);
			break;
		}

		// below "<" or ">" is just a guess
		if(leftValue < rightValue) b = val;
		else a = val;
	}
})();
