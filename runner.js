
const PLAYER_PROFILE = 'Player';

export default class GameRunner {
    constructor(
        boardHandler,
        startButton,
        hintButton,
        colorButton,
        initialBoard,
        player1,
        player2,
        canFlip,
        mainMenuCallback
    ) {
        this.status = 0;
        this.initialBoard = initialBoard;
        this.startButton = startButton;
        this.hintButton = hintButton;
        this.colorButton = colorButton;
        this.started = false;
        this.selectedPiece = null;
        this.canFlip = canFlip;

        this.messagePromises = [];
        this.worker = new Worker('ai.js');

        console.log(Math.random());
        if (this.canFlip && Math.random() < 0.5) {
            this.players = [player2, player1];
        } else {
            this.players = [player1, player2];
        }

        this.worker.onmessage = (e) => {
            let result = e.data;
            for (let [resolve, reject] of this.messagePromises) {
                resolve(result);
            }
            this.messagePromises = [];
        }

        this.boardHandler = boardHandler;
        this.uipromises = [];

        this.boardHandler.onClick((x, y) => this.handleClick(x, y));
        this.startButton.onclick = () => this.handleStartOrRestart();
        this.colorButton.onclick = () => {
            if (!this.started && this.canFlip) {
                this.swapColors();
            }
        }
        this.hintButton.onclick = () => {
            this.abortGameRun();
            mainMenuCallback();
        };

        this.initialBoard = initialBoard;
        this.board = Array.from(initialBoard);

        this.refreshColors();
    }

    renderColor(color) {
        if (color == 0) {
            this.colorButton.className = 'whiteButton';
            this.colorButton.innerText = 'White';
        } else {
            this.colorButton.className = 'blackButton';
            this.colorButton.innerText = 'Black';
        }
    }

    renderStatus(status) {
        let text;
        switch (status) {
            case 1:
                text = 'Stalemate.';
                break;
            case 2:
                text = 'Checkmate.';
                break;
            case 3:
                text = 'Tie on material.';
                break;
            case 4:
                text = '3 position repetition.';
                break;
            case 5:
                text = '100 move rule.';
                break;
        }

        this.colorButton.className = 'statusButton';
        this.colorButton.innerText = text;
    }

    refreshColors() {
        console.log('RefreshColors');
        console.log(this.players);
        if (this.players[1] == PLAYER_PROFILE && this.players[0] != PLAYER_PROFILE) {
            this.boardHandler.setRenderOptions({ reverse: false });
            this.renderColor(1);
            console.log('Rendering black');

        } else {
            this.boardHandler.setRenderOptions({ reverse: true });
            this.renderColor(0);
            console.log('Rendering white');

        }

        this.boardHandler.renderBoard(this.board);
    }

    swapColors() {
        this.players = [this.players[1], this.players[0]];
        this.refreshColors();
    }

    handleStartOrRestart() {
        if (this.started) {
            this.startButton.innerText = 'Start';
            this.boardHandler.setHighlights([]);
            this.abortGameRun();
            this.started = false;
            this.board = Array.from(this.initialBoard);

            if (this.status != 0 && this.canFlip) {
                this.swapColors();
            }

            this.boardHandler.renderBoard(this.board);
        } else {
            this.started = true;
            this.runGame(0);
        }
    }

    async handleClick(x, y) {
        for (let [resolve, reject] of this.uipromises) {
            resolve([x, y]);
        }
        this.uipromises = [];

        // We can only count the first move when we
        if (!this.started && this.players[0] == PLAYER_PROFILE) {
            if (
                this.selectedPiece &&
                this.boardHandler.isHighlighted(x, y)
            ) {
                // Make sure that the 3 move rule is applied consistently
                this.status = await this.invokeWorker('checkStatus', this.board, 1);
                let [sx, sy] = this.selectedPiece;
                this.board[6 * y + x] = this.board[6 * sy + sx];
                this.board[6 * sy + sx] = 0;
                this.boardHandler.renderBoard(this.board);
                this.started = true;
                this.runGame(1);
                return;
            }

            this.selectedPiece = [x, y];
            let pieceColor = this.board[y * 6 + x] & 1;
            if (pieceColor != 0) {
                // Not our piece? Deselect everything
                this.boardHandler.setHighlights([]);
                return;
            }

            let legalMoves = await this.invokeWorker(
                'getLegalMoves',
                this.board,
                y * 6 + x
            );

            this.boardHandler.setHighlights(legalMoves);
        }
    }


    invokeWorker(method) {
        let promise = new Promise((resolve, reject) => {
            this.messagePromises.push([resolve, reject]);
        });

        if ((typeof method) != 'string') {
            console.error(`Method must be of type string, not ${typeof method}`);
        }

        this.worker.postMessage(Array.from(arguments));
        return promise;
    }

    promiseClick() {
        return new Promise((resolve, reject) => {
            this.uipromises.push([resolve, reject]);
        });
    }

    abortGameRun() {
        for (let [resolve, reject] of this.messagePromises) {
            reject('Aborted');
        }
        this.messagePromises = [];

        for (let [resolve, reject] of this.uipromises) {
            reject('Aborted');
        }
        this.uipromises = [];
    }

    cleanup() {
        this.abortGameRun();
        this.boardHandler.cleanup();
        this.worker.terminate();
    }

    async runGame(color) {
        this.startButton.innerText = 'Restart';
        await this.invokeWorker('initGame');
        this.boardHandler.renderBoard(this.board);

        for (let i = 0; i < this.players.length; i++) {
            if (this.players[i] == PLAYER_PROFILE) {
                await this.invokeWorker('loadProfile', 'Hint', i);
            } else {
                await this.invokeWorker('loadProfile', this.players[i], i);
            }
        }

        this.status = await this.invokeWorker('checkStatus', this.board, 1 - color);
        while (this.status == 0) {
            let move;
            if (this.players[color] == PLAYER_PROFILE) {
                // If we're prompting a player for their move, we want their
                // color to be displayed in player vs player cases
                let [sx, sy] = await this.promiseClick();
                let dx, dy;
                while (true) {
                    let pieceColor = this.board[sy * 6 + sx] & 1;
                    if (pieceColor != (color)) {
                        // Not our piece? Deselect everything
                        this.boardHandler.setHighlights([]);
                        [sx, sy] = await this.promiseClick();
                        continue;
                    }

                    let legalMoves = await this.invokeWorker(
                        'getLegalMoves',
                        this.board,
                        sy * 6 + sx
                    );

                    this.boardHandler.setHighlights(legalMoves);

                    [dx, dy] = await this.promiseClick();

                    if (legalMoves.includes(dy * 6 + dx)) {
                        break;
                    }
                    [sx, sy] = [dx, dy];
                }
                move = (dy * 6 + dx) * 36 + sy * 6 + sx;
            } else {
                let minimumWait = new Promise(resolve => setTimeout(resolve, 400));
                move = await this.invokeWorker(
                    'getBestMove',
                    this.board,
                    1 - color,
                    color
                );
                // Don't make a move immediately if we have an obvious one,
                // take an additional second to "think" in order to make it
                // look natural
                await minimumWait;
            }

            let source = move % 36;
            let dest = Math.floor(move / 36);

            if (this.board[dest] == 18 || this.board[dest] == 19) {
                throw 'Attempt to take the king ' + source + ' ' + dest;
            }

            this.boardHandler.setHighlights([source, dest]);

            if ((this.board[source] == 2 || this.board[source] == 3) &&
                (dest < 6 || dest >= 30)
            ) {
                this.board[dest] = this.board[source] + 12;
            } else {
                this.board[dest] = this.board[source];
            }
            this.board[source] = 0;

            this.boardHandler.renderBoard(this.board);

            color = 1 - color;
            this.status = await this.invokeWorker('checkStatus', this.board, 1 - color);
        }

        this.startButton.innerText = 'Game Over';
        this.renderStatus(this.status)
    }
}

