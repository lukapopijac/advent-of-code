const amphipod2roomId = {'A': 0, 'B': 1, 'C': 2, 'D': 3};
const roomId2amphipod = ['A', 'B', 'C', 'D'];
const roomEntrance    = {'A': 2, 'B': 4, 'C': 6, 'D': 8};
const points = {'A': 1, 'B': 10, 'C': 100, 'D': 1000};
const emptyHall = Array(11).fill(0).map((_, i) => '...........'.slice(0, i));
const hallStops = [0, 1, 3, 5, 7, 9, 10];

function roomAcceptingDepth(amphipod, room) {
    for(let i=room.length-1; i>=0; i--) {
        if(room[i]=='.') return i;
        if(room[i]!=amphipod) return -1;
    }
    // should come here only if it is full of correct amphipods
    return 0;
}

function roomRemovingDepth(roomId, room) {
    let d = roomAcceptingDepth(roomId2amphipod[roomId], room);
    if(d >= 0) return -1;
    for(let i=0; i<room.length; i++) {
        if(room[i]!='.') return i;
    }
}

function isPathAccessible(i, j, hall) {
    let h = emptyHall[Math.abs(j-i)];
    if(i<j && hall.substring(i+1, j+1) != h) return false;
    if(j<i && hall.substring(j, i) != h) return false;
    return true;
}

function generateNextState(state, roomId, depth, i, direction) {
    let [hall, ...rooms] = state.split('|');
    let room = rooms[roomId];
    if(direction == 'to-room') {
        let amphipod = hall[i];
        hall = hall.substring(0, i) + '.' + hall.substring(i+1);
        rooms[roomId] = room.substring(0, depth) + amphipod + room.substring(depth+1);
    } else {
        let amphipod = room[depth];
        hall = hall.substring(0, i) + amphipod + hall.substring(i+1);
        rooms[roomId] = room.substring(0, depth) + '.' + room.substring(depth+1);
    }
    return [hall, ...rooms].join('|');
}

function getNextStates(state) {
    let ret = [];
    let [hall, ...rooms] = state.split('|');

    // move from hallway to room
    for(let i of hallStops) {
        if(hall[i]=='.') continue;
        let amphipod = hall[i];

        // check if it's room can accept
        let roomId = amphipod2roomId[amphipod];
        let room = rooms[roomId];
        let depth = roomAcceptingDepth(amphipod, room);
        if(depth < 0) continue;
        
        // check if the room is accessible from hall[i]
        let j = roomEntrance[amphipod];
        if(!isPathAccessible(i, j, hall)) continue;

        // amphipod from position i can move to it's room
        let nextState = generateNextState(state, roomId, depth, i, 'to-room');
        let cost = (Math.abs(j-i)+depth+1)*points[amphipod];
        ret.push({state: nextState, cost});
    }

    // move from room to hallway
    for(let roomId=0; roomId<4; roomId++) {
        let room = rooms[roomId];
        let depth = roomRemovingDepth(roomId, room);
        if(depth < 0) continue;
        let amphipod = room[depth];
        for(let i of hallStops) {
            if(hall[i]!='.') continue;
            let j = 2*(roomId+1);
            if(!isPathAccessible(i, j, hall)) continue;
            
            // amphipod from roomId can move to hall[i]
            let nextState = generateNextState(state, roomId, depth, i, 'from-room');
            let cost = (Math.abs(j-i)+depth+1)*points[amphipod];
            ret.push({state: nextState, cost});
        }
    }

    return ret;
}

function search(start, goal) {
    let bestCost = Infinity;
    function dfs(state, cost) {
        if(cost >= bestCost) return;
        if(state == goal) bestCost = cost;
        let nextStates = getNextStates(state);
        for(let nextState of nextStates) {
            dfs(nextState.state, cost + nextState.cost);
        }
    }
    dfs(start, 0);
    return bestCost;
}



// part 1 (runs in about 6min)

(_ => {
    let t0 = new Date();
    console.log(search(
        '...........|BB|AC|AD|DC',
        '...........|AA|BB|CC|DD'
    ));
    console.log('time', new Date() - t0);
})();


// part 2 (runs in about 9s)

(_ => {
    let t0 = new Date();
    console.log(search(
        '...........|BDDB|ACBC|ABAD|DACC',
        '...........|AAAA|BBBB|CCCC|DDDD'
    ));
    console.log('time', new Date() - t0);
})();
