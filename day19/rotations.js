let cos = Math.cos;
let sin = Math.sin;

// from wikipedia: https://en.wikipedia.org/wiki/Rotation_matrix#General_rotations
let rot = (a, b, c) => [
    [ cos(a)*cos(b),    cos(a)*sin(b)*sin(c) - sin(a)*cos(c),    cos(a)*sin(b)*cos(c) + sin(a)*sin(c) ],
    [ sin(a)*cos(b),    sin(a)*sin(b)*sin(c) + cos(a)*cos(c),    sin(a)*sin(b)*cos(c) - cos(a)*sin(c) ],
    [ -sin(b),          cos(b)*sin(c),                           cos(b)*cos(c)                        ]
];


let rotations = new Set();

const p = Math.PI / 2;
for(let i=0; i<4; i++) for(let j=0; j<4; j++) for(let k=0; k<4; k++) {
    rotations.add(
        JSON.stringify(
            rot(i*p, j*p, k*p),
            (key, val) => typeof val === 'number' ? Math.round(val) : val
        )
    );
}

console.log([...rotations].map(r => JSON.parse(r)));
