import GameRunner from './runner.js';
import tutorial from './tutorial.js'

function getImageSource(pieceId) {
    switch (pieceId) {
        case 2:
            return 'img/pawn_light.png';
        case 3:
            return 'img/pawn_dark.png';
        case 4:
            return 'img/superpawn_light.png';
        case 5:
            return 'img/superpawn_dark.png';
        case 6:
            return 'img/knight_light.png';
        case 7:
            return 'img/knight_dark.png';
        case 8:
            return 'img/bishop_light.png';
        case 9:
            return 'img/bishop_dark.png';
        case 10:
            return 'img/rook_light.png';
        case 11:
            return 'img/rook_dark.png';
        case 12:
            return 'img/archbishop_light.png';
        case 13:
            return 'img/archbishop_dark.png';
        case 14:
            return 'img/queen_light.png';
        case 15:
            return 'img/queen_dark.png';
        case 16:
            return 'img/dragon_light.png';
        case 17:
            return 'img/dragon_dark.png';
        case 18:
            return 'img/king_light.png';
        case 19:
            return 'img/king_dark.png';
        default:
            return null;
    }
}

class BoardHandler {
    constructor(boardElement) {
        this.boardElement = boardElement;
        this.squareElements = [];
        this.clickHandlers = [];
        this.highlights = [];
        this.renderOptions = {
            reverse: false
        };
    }

    addSquare(squareEl) {
        this.squareElements.push(squareEl);
    }

    handleClick(x, y) {
        console.log(`Click for (x=${x},y=${y})`);
        if (this.renderOptions.reverse) {
            x = 5 - x;
            y = 5 - y;
        }

        for (let handler of this.clickHandlers) {
            handler(x, y);
        }
    }

    onClick(func) {
        this.clickHandlers.push(func);
    }

    renderBoard(boardValues) {
        for (let i = 0; i < 36; i++) {
            let elem = this.squareElements[i];
            if (this.renderOptions.reverse) {
                elem = this.squareElements[35 - i];
            }

            if (boardValues[i] === 0) {
                elem.childNodes[0].hidden = true;
            } else {
                elem.childNodes[0].hidden = false;
                elem.childNodes[0].setAttribute('src', getImageSource(boardValues[i]));
            }
        }
    }

    setHighlights(highlights) {
        for (let elem of this.squareElements) {
            elem.style.border = '';
        }

        this.highlights = highlights;
        for (let i of highlights) {
            let elem = this.squareElements[i];
            if (this.renderOptions.reverse) {
                elem = this.squareElements[35 - i];
            }
            elem.style.border = 'thick solid #0000FF';
        }
    }

    isHighlighted(x, y) {
        return this.highlights.includes(y * 6 + x);
    }

    setRenderOptions(options) {
        this.renderOptions = options;
    }

    cleanup() {
        if (this.boardElement.parentNode) {
            this.boardElement.parentNode.removeChild(this.boardElement);
        }
    }
}

function loadBoard() {
    let boardEl = document.createElement('div');
    let board = new BoardHandler(boardEl);

    for (let y = 0; y < 6; y++) {
        let spanEl = document.createElement('span');

        for (let x = 0; x < 6; x++) {
            let squareEl = document.createElement('button');
            squareEl.onclick = evt => (board.handleClick(x, y));
            squareEl.className = 'square';
            if ((x + y) % 2 == 1) {
                squareEl.style.backgroundColor = 'darkgray';
            }
            else {
                squareEl.style.backgroundColor = 'lightgray';
            }
            let image = document.createElement('img');
            image.hidden = true;
            image.className = 'pieceImg';
            squareEl.appendChild(image);

            spanEl.appendChild(squareEl);
            board.addSquare(squareEl);
        }

        spanEl.appendChild(document.createElement('br'));

        boardEl.appendChild(spanEl);
        boardEl.className = 'boardDiv';
    }

    return board;
}

function doTransition(lambda) {
    let contentElement = document
        .getElementById('content');

    while (contentElement.firstChild) {
        contentElement.firstChild.remove();
    }

    lambda();
}

function transitionToGame(playerA, playerB, board, colorSwitch) {
    let boardHandler = loadBoard();
    document
        .getElementById('content')
        .appendChild(boardHandler.boardElement);

    let buttonsHolder = document.createElement('div');
    buttonsHolder.className = 'boardButtonsHolder';

    let colorButton = document.createElement('button');
    colorButton.innerText = 'White';
    colorButton.className = 'whiteButton';
    buttonsHolder.appendChild(colorButton);

    let hintAndStartHolder = document.createElement('div');
    hintAndStartHolder.className = 'hintAndStartHolder';

    let startButton = document.createElement('button');
    startButton.innerText = 'Start';
    startButton.className = 'startButton';
    hintAndStartHolder.appendChild(startButton);

    let hintButton = document.createElement('button');
    hintButton.innerText = 'Exit';
    hintButton.className = 'hintButton';
    hintAndStartHolder.appendChild(hintButton);

    buttonsHolder.append(hintAndStartHolder);

    document
        .getElementById('content')
        .appendChild(buttonsHolder);

    let gameExit = () => doTransition(
        () => transitionToMain()
    );

    let runner = new GameRunner(
        boardHandler,
        startButton,
        hintButton,
        colorButton,
        board,
        playerA,
        playerB,
        colorSwitch,
        gameExit
    );
}

function transitionToMain() {
    let contentElement = document
        .createElement('div');
    contentElement.className = 'menuHolder';

    let button = document.createElement('button');
    button.className = 'playModeButton buttonExtra';
    button.innerText = 'How to Play: Learn the Game.';
    button.onclick = () => doTransition(
        () => transitionToTutorial()
    );
    contentElement.appendChild(button);

    contentElement.appendChild(
        document.createTextNode('Pick your opponent')
    );

    button = document.createElement('button');
    button.className = 'playModeButton buttonA';
    button.innerText = 'Confident: Plays worse when winning.';
    button.onclick = () => doTransition(
        () => transitionToGame(
            'Player',
            'Confident',
            [
                10, 6, 18, 14, 6, 10,
                2, 2, 2, 2, 2, 2,
                0, 0, 0, 0, 0, 0,
                0, 0, 0, 0, 0, 0,
                3, 3, 3, 3, 3, 3,
                11, 7, 19, 15, 7, 11
            ],
            true
        )
    );
    contentElement.appendChild(button);

    button = document.createElement('button');
    button.className = 'playModeButton buttonB';
    button.innerText = 'Backbone: Takes risks!';
    button.onclick = () => doTransition(
        () => transitionToGame(
            'Player',
            'Backbone',
            [
                10, 6, 18, 14, 6, 10,
                2, 2, 2, 2, 2, 2,
                0, 0, 0, 0, 0, 0,
                0, 0, 0, 0, 0, 0,
                3, 3, 3, 3, 3, 3,
                11, 7, 19, 15, 7, 11
            ],
            true
        )
    );
    contentElement.appendChild(button);

    button = document.createElement('button');
    button.className = 'playModeButton buttonC';
    button.innerText = 'Doubter: Doesn\'t take risks.';
    button.onclick = () => doTransition(
        () => transitionToGame(
            'Player',
            'Doubter',
            [
                10, 6, 18, 14, 6, 10,
                2, 2, 2, 2, 2, 2,
                0, 0, 0, 0, 0, 0,
                0, 0, 0, 0, 0, 0,
                3, 3, 3, 3, 3, 3,
                11, 7, 19, 15, 7, 11
            ],
            true
        )
    );
    contentElement.appendChild(button);

    button = document.createElement('button');
    button.className = 'playModeButton buttonD';
    button.innerText = 'Standard: Plays typically.';
    button.onclick = () => doTransition(
        () => transitionToGame(
            'Player',
            'Standard',
            [
                10, 6, 18, 14, 6, 10,
                2, 2, 2, 2, 2, 2,
                0, 0, 0, 0, 0, 0,
                0, 0, 0, 0, 0, 0,
                3, 3, 3, 3, 3, 3,
                11, 7, 19, 15, 7, 11
            ],
            true
        )
    );
    contentElement.appendChild(button);

    button = document.createElement('button');
    button.className = 'playModeButton buttonE';
    button.innerText = 'Robotic: Only considers material.';
    button.onclick = () => doTransition(
        () => transitionToGame(
            'Player',
            'Robotic',
            [
                10, 6, 18, 14, 6, 10,
                2, 2, 2, 2, 2, 2,
                0, 0, 0, 0, 0, 0,
                0, 0, 0, 0, 0, 0,
                3, 3, 3, 3, 3, 3,
                11, 7, 19, 15, 7, 11
            ],
            true
        )
    );
    contentElement.appendChild(button);

    button = document.createElement('button');
    button.className = 'playModeButton buttonF';
    button.innerText = 'Zenith: The core app AI.';
    button.onclick = () => doTransition(
        () => transitionToGame(
            'Player',
            'Zenith',
            [
                10, 6, 18, 14, 6, 10,
                2, 2, 2, 2, 2, 2,
                0, 0, 0, 0, 0, 0,
                0, 0, 0, 0, 0, 0,
                3, 3, 3, 3, 3, 3,
                11, 7, 19, 15, 7, 11
            ],
            true
        )
    );
    contentElement.appendChild(button);

    button = document.createElement('button');
    button.className = 'playModeButton buttonExtra';
    button.innerText = 'Other fun things to do';
    button.onclick = () => doTransition(
        () => transitionToExtras()
    );
    contentElement.appendChild(button);

    document.getElementById('content').appendChild(contentElement);
}

function transitionToExtras() {
    let contentElement = document
        .createElement('div');
    contentElement.className = 'menuHolder';

    contentElement.appendChild(
        document.createTextNode('Fun variants')
    );

    let button = document.createElement('button');
    button.className = 'playModeButton buttonA';
    button.innerText = 'Many Kings';
    button.onclick = () => doTransition(
        () => transitionToGame(
            'Player',
            'Awesome',
            [
                10, 6, 18, 18, 6, 10,
                2, 2, 2, 2, 2, 2,
                0, 0, 0, 0, 0, 0,
                0, 0, 0, 0, 0, 0,
                3, 3, 3, 3, 3, 3,
                11, 7, 19, 19, 7, 11
            ],
            true
        )
    );
    contentElement.appendChild(button);

    button = document.createElement('button');
    button.className = 'playModeButton buttonB';
    button.innerText = 'Knights of the round table';
    button.onclick = () => doTransition(
        () => transitionToGame(
            'Player',
            'Awesome',
            [
                6, 6, 18, 6, 6, 6,
                2, 2, 2, 2, 2, 2,
                0, 0, 0, 0, 0, 0,
                0, 0, 0, 0, 0, 0,
                3, 3, 3, 3, 3, 3,
                7, 7, 7, 19, 7, 7
            ],
            true
        )
    );
    contentElement.appendChild(button);

    button = document.createElement('button');
    button.className = 'playModeButton buttonC';
    button.innerText = 'Reverse Chess';
    button.onclick = () => doTransition(
        () => transitionToGame(
            'Player',
            'Awesome',
            [
                11, 7, 19, 15, 7, 11,
                3, 3, 3, 3, 3, 3,
                0, 0, 0, 0, 0, 0,
                0, 0, 0, 0, 0, 0,
                2, 2, 2, 2, 2, 2,
                10, 6, 18, 14, 6, 10
            ],
            true
        )
    );
    contentElement.appendChild(button);

    button = document.createElement('button');
    button.className = 'playModeButton buttonD';
    button.innerText = 'Bishops';
    button.onclick = () => doTransition(
        () => transitionToGame(
            'Player',
            'Awesome',
            [
                10, 8, 18, 14, 8, 10,
                2, 2, 2, 2, 2, 2,
                0, 0, 0, 0, 0, 0,
                0, 0, 0, 0, 0, 0,
                3, 3, 3, 3, 3, 3,
                11, 9, 19, 15, 9, 11
            ],
            true
        )
    );
    contentElement.appendChild(button);

    button = document.createElement('button');
    button.className = 'playModeButton buttonE';
    button.innerText = 'Chaos';
    button.onclick = () => doTransition(
        () => transitionToGame(
            'Player',
            'Awesome',
            [
                10, 12, 18, 16, 12, 10,
                4, 4, 4, 4, 4, 4,
                0, 0, 0, 0, 0, 0,
                0, 0, 0, 0, 0, 0,
                5, 5, 5, 5, 5, 5,
                11, 13, 19, 17, 13, 11
            ],
            true
        )
    );
    contentElement.appendChild(button);

    contentElement.appendChild(
        document.createTextNode('Challenges')
    );

    button = document.createElement('button');
    button.className = 'playModeButton buttonA';
    button.innerText = 'Defensive Fort';
    button.onclick = () => doTransition(
        () => transitionToGame(
            'Player',
            'Challenge',
            [
                10, 6, 18, 14, 6, 10,
                2, 2, 2, 2, 2, 2,
                0, 0, 0, 0, 0, 0,
                0, 0, 0, 0, 0, 0,
                5, 5, 5, 5, 5, 5,
                11, 11, 19, 7, 11, 11
            ],
            false
        )
    );
    contentElement.appendChild(button);

    button = document.createElement('button');
    button.className = 'playModeButton buttonC';
    button.innerText = 'Clergy';
    button.onclick = () => doTransition(
        () => transitionToGame(
            'Player',
            'Challenge',
            [
                10, 6, 18, 14, 6, 10,
                2, 2, 2, 2, 2, 2,
                0, 0, 0, 0, 0, 0,
                0, 0, 0, 0, 0, 0,
                3, 3, 3, 3, 3, 3,
                11, 9, 19, 13, 9, 11
            ],
            false
        )
    );
    contentElement.appendChild(button);

    button = document.createElement('button');
    button.className = 'playModeButton buttonF';
    button.innerText = 'The Dragon';
    button.onclick = () => doTransition(
        () => transitionToGame(
            'Player',
            'Challenge',
            [
                10, 6, 18, 14, 6, 10,
                2, 2, 2, 2, 2, 2,
                0, 0, 0, 0, 0, 0,
                0, 0, 0, 0, 0, 0,
                3, 3, 3, 3, 3, 3,
                11, 7, 19, 17, 7, 11
            ],
            false
        )
    );
    contentElement.appendChild(button);

    document.getElementById('content').appendChild(contentElement);
}

function transitionToTutorial() {
    let worker = new Worker('ai.js');

    function createSegment(segment, onto) {
        if (segment['image']) {
            let holder = document.createElement('div');
            holder.className = 'tutorialImageWrapper';
            let image = document.createElement('img');
            image.className = 'tutorialImage';
            image.setAttribute('src', segment['image']);
            holder.appendChild(image);
            onto.appendChild(holder);
        }

        if (segment['title'])
        {
            let title = document.createElement('h2');
            title.style = 'text-align: center;'
            title.innerText = segment['title'];
            onto.appendChild(title);
        }

        for (let part of segment['text']) {
            let body = document.createTextNode(part);
            onto.appendChild(body);
            onto.appendChild(document.createElement('br'));
            onto.appendChild(document.createElement('br'));
        }

        if (segment['board']) {
            let board = Array.from(segment['board']);
            let boardHandler = loadBoard();
            boardHandler.setRenderOptions({ reverse: true });
            boardHandler.renderBoard(board);
            onto.appendChild(boardHandler.boardElement);
            let selectedSquare = -1;
            let legalMoves = [];
            let resolve;

            worker.addEventListener('message', result => {
                if (resolve) {
                    resolve(result.data);
                    resolve = undefined;
                }
            });

            boardHandler.onClick((x, y) => {
                let sq = y * 6 + x;
                if (selectedSquare != -1 && legalMoves.includes(sq)) {
                    board[sq] = board[selectedSquare];
                    board[selectedSquare] = 0;

                    if ((board[sq] == 2 || board[sq] == 3) && (sq >= 30 || sq < 6)) {
                        board[sq] += 12;
                    }

                    boardHandler.setHighlights([selectedSquare, sq]);
                    legalMoves = [];
                    selectedSquare = -1;
                    boardHandler.renderBoard(board);
                } else if ((board[sq] & 1) == 0 && board[sq] != 0) {
                    selectedSquare = sq;
                    let promise = new Promise(r => resolve = r);
                    worker.postMessage(['getLegalMoves', board, sq]);
                    promise.then(l => {
                        boardHandler.setHighlights(l);
                        legalMoves = l;
                    });
                } else {
                    legalMoves = [];
                    selectedSquare = -1;
                    boardHandler.setHighlights([]);
                }
            })
        }
    }

    let contentElement = document
        .createElement('div');
    contentElement.className = 'tutorial';

    createSegment(tutorial.welcome, contentElement);
    createSegment(tutorial.pawn, contentElement);
    createSegment(tutorial.knight, contentElement);
    createSegment(tutorial.rook, contentElement);
    createSegment(tutorial.queen, contentElement);
    createSegment(tutorial.king, contentElement);
    createSegment(tutorial.check1, contentElement);
    createSegment(tutorial.check2, contentElement);
    createSegment(tutorial.moveon, contentElement);

    let button = document.createElement('button');
    button.className = 'playModeButton buttonB';
    button.innerText = 'Careless: A beginner to play against.';
    button.style.minHeight = '1in';
    button.onclick = () => {
        worker.terminate();
        doTransition(
            () => transitionToGame(
                'Player',
                'Careless',
                [
                    10, 6, 18, 14, 6, 10,
                    2, 2, 2, 2, 2, 2,
                    0, 0, 0, 0, 0, 0,
                    0, 0, 0, 0, 0, 0,
                    3, 3, 3, 3, 3, 3,
                    11, 7, 19, 15, 7, 11
                ],
                true
            )
        );
    };
    contentElement.appendChild(button);

    button = document.createElement('button');
    button.className = 'playModeButton buttonD';
    button.innerText = 'Casual: An expert going easy.';
    button.style.minHeight = '1in';
    button.onclick = () => {
        worker.terminate();
        doTransition(
            () => transitionToGame(
                'Player',
                'Casual',
                [
                    10, 6, 18, 14, 6, 10,
                    2, 2, 2, 2, 2, 2,
                    0, 0, 0, 0, 0, 0,
                    0, 0, 0, 0, 0, 0,
                    3, 3, 3, 3, 3, 3,
                    11, 7, 19, 15, 7, 11
                ],
                true
            )
        );
    };
    contentElement.appendChild(button);

    document.getElementById('content').appendChild(contentElement);
}

export { loadBoard, transitionToGame, transitionToMain, doTransition };