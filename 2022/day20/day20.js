// not solved

let f = await Deno.readTextFile('./input0.txt');
let input = f
	.trim()
	.split('\n')
	.map(x => +x)
;


// part 1

(_ => {
	let n = input.length;
	let arr = input.map(val => ({val}));

	for(let i=0; i<n; i++) {
		arr[i].next = arr[(i+1) % n];
		arr[i].prev = arr[(i-1+n) % n];
	}

	// printList(arr[0]);

	for(let a of arr) {
		let p = a;

		if(p.val == 0) {
			// printList(arr[0]);
			continue;
		}

		let steps = p.val % n;

		p.next.prev = p.prev;
		p.prev.next = p.next;

		let q = p;
		for(let i=0; i<steps; i++) q = q.next;
		for(let i=0; i>=steps; i--) q = q.prev;
		p.next = q.next;
		p.next.prev = p;
		p.prev = q;
		q.next = p;

		// printList(arr[0]);
	}

	// printList(arr[0]);

	// find zero
	let r;
	for(let a of arr) if(a.val == 0) {
		r = a;
		break;
	}

	let result = 0;
	for(let k=0; k<3; k++) {
		for(let i=0; i<1000; i++) r = r.next;
		result += r.val;
		console.log(r.val);
	}
	console.log(result);
})();


function print(arr) {
	for(let i=0; i<arr.length; i++) {
		console.log(i, '  val:', arr[i].val, '   next:', arr[i].next.val, '   prev:', arr[i].prev.val);
	}
}

function printList(a) {
	let arr = [a.val];
	for(let b=a.next; b!=a; b=b.next) arr.push(b.val);
	console.log(arr.join(', '))
}