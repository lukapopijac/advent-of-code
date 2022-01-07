let a = await Deno.readTextFile('./input.txt');

let s = a.trim().split('\n');
let [m, n] = [s.length, s[0].length];

let re1 = new RegExp(`(v)(.{${n}})(\\.)`, 'gs');  // vertical move, not over the edge
let re2 = new RegExp(`(\\.)(.{${(n+1)*(m-1)-1}})(v)`, 'gs');  // vertical move over the edge

let cnt = 0;
let b;
while(b != a) {
    b = a;
    cnt++;

    // horizontal move
    a = a.replace(/(>\.)/g, '_x');
    a = a.replace(/(^\.)(.+)(>$)/mg, 'x$2_'); // over the edge
    a = a.replaceAll('_', '.').replaceAll('x', '>');

    // vertical move
    while(re1.test(a)) a = a.replace(re1, '_$2x');
    while(re2.test(a)) a = a.replace(re2, 'x$2_');
    a = a.replaceAll('_', '.').replaceAll('x', 'v');

    if(cnt%10==0) console.log(cnt);
}    

console.log(cnt);    
