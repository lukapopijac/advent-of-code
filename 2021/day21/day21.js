let p1, p2;

// example input
// [p1, p2] = [4, 8];

// real input
[p1, p2] = [9, 4];



// part 1

((p1, p2) => {
    let s1 = 0;
    let s2 = 0;
    let totalRolls = 0;
    let r = 0;
    let d;
    while(true) {
        d = 0;
        r++; if(r==101) r = 1; d += r;
        r++; if(r==101) r = 1; d += r;
        r++; if(r==101) r = 1; d += r;
        totalRolls += 3;
        p1 = (p1 + d - 1)%10 + 1;
        s1 += p1;
        // console.log('p1 rolls ', d, ' and moves to space ', p1, ' for a total ', s1);
        if(s1>=1000) break;

        d = 0;
        r++; if(r==101) r = 1; d += r;
        r++; if(r==101) r = 1; d += r;
        r++; if(r==101) r = 1; d += r;
        totalRolls += 3;
        p2 = (p2 + d - 1)%10 + 1;
        s2 += p2;
        // console.log('p2 rolls ', d, ' and moves to space ', p2, ' for a total ', s2);
        if(s2>=1000) break;
    }
    let s = s1<s2 ? s1 : s2;
    console.log(s * totalRolls);
 })(p1, p2);



// part 2

function roll3times(mvs) {
    let mvs2 = {};
    let states = Object.keys(mvs);
    for(let state of states) {
        let [p1, p2, s1, s2, player] = state.split(',').map(x => +x);
        
        if(s1 == 21 || s2 == 21) {
            if(!mvs2[state]) mvs2[state] = 0;
            mvs2[state] += mvs[state];
        } else {
            let q = [,,, 1, 3, 6, 7, 6, 3, 1];
            for(let d=3; d<=9; d++) {
                let newState;
                if(player == 1) {
                    let p = (p1 + d - 1)%10 + 1;
                    let s = s1 + p;
                    if(s > 21) s = 21;
                    newState = [p, p2, s, s2, 3-player].join(',');
                } else {
                    let p = (p2 + d - 1)%10 + 1;
                    let s = s2 + p;
                    if(s > 21) s = 21;
                    newState = [p1, p, s1, s, 3-player].join(',');
                }
                if(!mvs2[newState]) mvs2[newState] = 0;
                mvs2[newState] += q[d] * mvs[state];
            }
        }
    }
    return mvs2;
}

function isAllFinished(mvs) {
    let states = Object.keys(mvs);
    for(let state of states) {
        let [p1, p2, s1, s2, player] = state.split(',').map(x => +x);
        if(s1 < 21 && s2 < 21) return false;
    }
    return true;
}


((p1, p2) => {
    let mvs = {}; // key: 'p1,p2,s1,s2,next_player'
    mvs[[p1, p2, 0, 0, 1].join(',')] = 1;

    while(!isAllFinished(mvs)) mvs = roll3times(mvs);    

    // count wins
    let [cnt1, cnt2] = [0, 0];
    let states = Object.keys(mvs);
    for(let state of states) {
        let [p1, p2, s1, s2, player] = state.split(',').map(x => +x);
        if(s1 == 21) cnt1 += mvs[state];
        if(s2 == 21) cnt2 += mvs[state];
    }
    console.log(Math.max(cnt1, cnt2));
})(p1, p2);
