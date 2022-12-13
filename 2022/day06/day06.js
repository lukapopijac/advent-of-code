let f = await Deno.readTextFile('./input1.txt');
let buffer = f.trim();


function findPosition(buffer, markerLength) {
	for(let i=4; i<=buffer.length; i++) {
		let marker = buffer.slice(i-markerLength, i);
		let s = new Set(marker);
		if(s.size == markerLength) return i;
	}
}

// part 1
console.log(findPosition(buffer, 4))

// part 2
console.log(findPosition(buffer, 14))
