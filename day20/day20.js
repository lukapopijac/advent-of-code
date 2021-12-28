let f = await Deno.readTextFile('./input.txt');
let lines = f
    .trim()
    .split('\n')
;

let iea = lines[0].split('').map(p => Number(p=='#'));

let image = lines
    .slice(2)
    .map(row => 
        row.split('').map(p => Number(p=='#'))
    )
;


function prepare(image, outerBit = image[0][0]) {
    let n = image[0].length;
    image.unshift(Array(n).fill(outerBit));
    image.push(Array(n).fill(outerBit));
    for(let row of image) {
        row.unshift(outerBit);
        row.push(outerBit);
    }
    return image;
}

function enhance(image) {
    let [m, n] = [image.length, image[0].length];
    let newImage = copyImage(image);
    for(let i=1; i<m-1; i++) {
        for(let j=1; j<n-1; j++) {
            newImage[i][j] = iea[
                parseInt([].concat(
                    image[i-1].slice(j-1, j+2),
                    image[i  ].slice(j-1, j+2),
                    image[i+1].slice(j-1, j+2)
                ).join(''), 2)
            ];
        }
    }
    let newOuterBit = iea[511*image[0][0]];
    newImage[0] = Array(m).fill(newOuterBit);
    newImage[m-1] = Array(m).fill(newOuterBit);
    for(let row of newImage) {
        row[0] = newOuterBit;
        row[n-1] = newOuterBit;
    }
    return newImage;
}

function countOnes(image) {
    let cnt = 0;
    for(let i=0; i<image.length; i++) {
        for(let j=0; j<image.length; j++) {
            cnt += image[i][j];
        }
    }
    return cnt;
}

function copyImage(image) {
    let newImage = image.map(row => row.slice(0));
    return newImage;
}

function printImage(image) {
    for(let i=0; i<image.length; i++) {
        console.log(image[i].map(x => x?'#':'.').join(''));
    }
}



// part 1

(image => {
    image = copyImage(image);
    prepare(image, 0);

    prepare(image); image = enhance(image);
    prepare(image); image = enhance(image);

    console.log(countOnes(image));
})(image);


// part 2

(image => {
    image = copyImage(image);
    prepare(image, 0);

    for(let i=0; i<50; i++) {
        prepare(image);
        image = enhance(image);
    }

    console.log(countOnes(image));
})(image);
