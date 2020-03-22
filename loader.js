function getImageSource(pieceId) {
    switch (pieceId)
    {
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
        console.log(this.highlights);
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
        if (this.boardElement.parentNode)
        {
            this.boardElement.parentNode.removeChild(this.boardElement);
        }
    }
}

function loadBoard() {
    let boardEl = document.createElement('div');
    let board = new BoardHandler(boardEl);

    for (let y = 0; y < 6; y++) {
        let spanEl = document.createElement('span');

        for(let x = 0; x < 6; x++) {
            let squareEl = document.createElement('button');
            squareEl.onclick = evt => (board.handleClick(x, y));
            squareEl.className = 'square';
            if ((x + y) % 2 == 1)
            {
                squareEl.style.backgroundColor = 'darkgray';
            }
            else
            {
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

export default loadBoard;