let f = await Deno.readTextFile('./input.txt');
let message = f
    .trim()
    .split('')
    .map(x => ('000' + parseInt(x, 16).toString(2)).slice(-4))
    .join('')
;


(_ => {
    let reader = {
        message,
        i: 0
    };
    
    let encoded = readPacket(reader);

    // part 1
    console.log(getVersionSum(encoded));

    // part 2
    console.log(getValue(encoded));
})();


function getVersionSum(packet) {
    let s = packet.version;
    for(let p of packet.packets) s += getVersionSum(p);
    return s;
}

function readPacket(reader) {
    let packet = {
        version: read(reader, 3),
        typeId: read(reader, 3),
        packets: [],
        value: null
    };

    if(packet.typeId == 4) {
        let value = 0;
        let isLastGroup = false;
        while(!isLastGroup) {
            isLastGroup = read(reader, 1) == 0;
            value = 16*value + read(reader, 4);
        }
        packet.value = value;
    } else {
        let lengthTypeId = read(reader, 1);
        if(lengthTypeId == 0) {
            let b = read(reader, 15);  // number of bits in subpackets
            let endPacketsI = b + reader.i;
            while(reader.i < endPacketsI) {
                packet.packets.push(readPacket(reader));
            }
        } else {
            let n = read(reader, 11);  // number of subpackets
            for(let i=0; i<n; i++) {
                packet.packets.push(readPacket(reader));
            }
        }
    }

    return packet;
}

function read(reader, len) {
    let {message, i} = reader;
    reader.i += len;
    return parseInt(message.slice(i, i+len), 2);
}

function getValue(p) {
    switch(p.typeId) {
        case 0: return p.packets.reduce((a, c) => a + getValue(c), 0);
        case 1: return p.packets.reduce((a, c) => a * getValue(c), 1);
        case 2: return p.packets.reduce((a, c) => Math.min(a, getValue(c)), Infinity);
        case 3: return p.packets.reduce((a, c) => Math.max(a, getValue(c)), -Infinity);
        case 4: return p.value;
        case 5: return +(getValue(p.packets[0]) > getValue(p.packets[1]));
        case 6: return +(getValue(p.packets[0]) < getValue(p.packets[1]));
        case 7: return +(getValue(p.packets[0]) == getValue(p.packets[1]));
    }
}
