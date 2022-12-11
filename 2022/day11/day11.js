let f = await Deno.readTextFile('./input1.txt');
let input = f
	.trim()
	.split('\n\n')
;


// part 1

(_ => {
	let monkeys = [];

	for(let m of input) {
		let d = m.split('\n');
		let items = d[1].split('Starting items: ')[1].split(',').map(x => +x);
		let operation = new Function('old', 'return ' + d[2].split('Operation: new = ')[1]);
		let divisibleBy = +d[3].split('Test: divisible by ')[1];
		let ifTrueMonkey = +d[4].split('If true: throw to monkey ')[1];
		let ifFalseMonkey = +d[5].split('If false: throw to monkey ')[1];
	
		monkeys.push({
			items,
			inspected: 0,
			throwItem(monkeys) {
				if(this.items.length == 0) return;
				let val = operation(this.items[0]);
				val = val/3 | 0;
				let toMonkey = val % divisibleBy == 0 ? ifTrueMonkey : ifFalseMonkey;
				monkeys[toMonkey].items.push(val);
				this.items = this.items.slice(1);
				this.inspected++;
			}
		})
	}

	for(let round=0; round<20; round++) {
		for(let monkey of monkeys) {
			while(monkey.items.length > 0) {
				monkey.throwItem(monkeys, val => val/3n | 0n);
			}
		}
	}

	monkeys.sort((a, b) => b.inspected - a.inspected);
	console.log(monkeys[0].inspected * monkeys[1].inspected);
})();


// part 2

(_ => {
	let monkeys = [];

	for(let m of input) {
		let d = m.split('\n');
		let items = d[1].split('Starting items: ')[1].split(',').map(x => +x);
		let divisibleBy = +d[3].split('Test: divisible by ')[1];
		let operation = new Function('old', 'return ' + d[2].split('Operation: new = ')[1]);
		let ifTrueMonkey = +d[4].split('If true: throw to monkey ')[1];
		let ifFalseMonkey = +d[5].split('If false: throw to monkey ')[1];
	
		monkeys.push({
			items,
			divisibleBy,
			inspected: 0,
			throwItem(monkeys, mod) {
				if(this.items.length == 0) return;
				let val = operation(this.items[0]);
				val %= mod;
				let toMonkey = val % divisibleBy == 0 ? ifTrueMonkey : ifFalseMonkey;
				monkeys[toMonkey].items.push(val);
				this.items = this.items.slice(1);
				this.inspected++;
			}
		})
	}

	let q = 1;
	for(let m of monkeys) q *= m.divisibleBy;

	for(let round=0; round<10000; round++) {
		for(let monkey of monkeys) {
			while(monkey.items.length > 0) {
				monkey.throwItem(monkeys, q);
			}
		}
	}

	monkeys.sort((a, b) => b.inspected - a.inspected);
	console.log(monkeys[0].inspected * monkeys[1].inspected);
})();
