let f = await Deno.readTextFile('./input.txt');
let message = f
    .trim()
    .split('')
    .map(x => ('000' + parseInt(x, 16).toString(2)).slice(-4))
    .join('')
;


// part 1

(_ => {
    let reader = {
        message,
        i: 0
    };
    
    let encoded = readPacket(reader);

    console.log(getVersionSum(encoded));
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
