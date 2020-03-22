importScripts('./engine.js', './profiles.js');

let mod = Module();
let engine = {
    initGame: mod.cwrap('initGame', null, []),
    checkStatus: mod.cwrap('checkStatus', 'number', ['array', 'number']),
    computeLegalMoves: mod.cwrap('computeLegalMoves', null, ['array', 'number']),
    getNextLegalMove: mod.cwrap('getNextLegalMove', null, []),
    setAIProperty: mod.cwrap('setAIProperty', 'number', ['array', 'number', 'number']),
    getBestMove: mod.cwrap('getBestMove', 'number', ['array', 'number', 'number'])
};
console.log('From ai.js: ' + engine);

function loadProfile(name, profileNum) {
    let profile = Profiles[name];
    let enc = new TextEncoder();
    for (const key in profile) {
        if (engine.setAIProperty(
            enc.encode(key + '\0'),
            profile[key],
            profileNum) != 1) {

            console.warn(`LoadProfile: Bad profile attribute '${key}'`);
        }
    }
}

function getLegalMoves(board, position) {
    engine.computeLegalMoves(
        new Uint8Array(new Uint32Array(board).buffer),
        position
    );

    let legalMoves = [];

    let legalMove = engine.getNextLegalMove();
    while (legalMove != -1)
    {
        legalMoves.push(legalMove);
        legalMove = engine.getNextLegalMove();
    }

    return legalMoves;
}

onmessage = function(e) {

    mod.then(() => {
        let result;
        switch (e.data[0]) {
            case 'loadProfile':
                loadProfile(e.data[1], e.data[2]);
                break;

            case 'initGame':
                engine.initGame();
                break;

            case 'checkStatus': {
                let board = e.data[1];
                let white = e.data[2];
                result = engine.checkStatus(
                    new Uint8Array(new Uint32Array(board).buffer),
                    white
                );
                break;
            }

            case 'getLegalMoves': {
                result = getLegalMoves(e.data[1], e.data[2]);
                break;
            }

            case 'getBestMove': {
                let board = e.data[1];
                let white = e.data[2];
                let profile = e.data[3];

                result = engine.getBestMove(
                    new Uint8Array(new Uint32Array(board).buffer),
                    white,
                    profile
                );
                break;
            }
        }

        postMessage(result);
    });
}