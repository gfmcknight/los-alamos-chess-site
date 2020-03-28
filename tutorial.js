export default {
    welcome: {
        title: "Los Alamos Chess",
        text: [
            "This page scrolls.",
            "Welcome to the tutorial for Los Alamos Chess! Los Alamos Chess is a miniature version of chess played on a 6-by-6 board. Two players, one controlling the white (or, on our board, red) pieces and one controlling the black pieces, play against each other.", "The player controlling the white pieces pushes upward against the player controlling the black pieces who pushes downward.",
            "You can move a piece by tapping on its square and then tapping where you want it to go. You can also move your pieces \"onto\" an opponent's piece and capture it. This is critical to winning."
        ]
    },
    pawn: {
        image: "img/pawn_light.png",
        title: "Pawn",
        text: [
            "Pawns are the foot-soldiers of your army. They can move forward when nothing is blocking their way. Pawns can also capture forward and to the side. When a pawn makes it to the opponent's back row, it gets automatically promoted to a better piece.",
            "See if you can get the white pawn promoted on the board below."
        ],
        board: [
            0, 0, 0, 0, 0, 0,
            0, 0, 0, 2, 0, 0,
            0, 0, 0, 0, 0, 0,
            0, 0, 7, 3, 0, 0,
            0, 0, 0, 0, 0, 0,
            0, 0, 0, 11, 0, 0,
        ]
    },
    knight: {
        image: "img/knight_light.png",
        title: "Knight",
        text: [
            "Knights are cavalry of your army. They move in the shape of an L.Knights can also hop over other pieces that are in their way.", "Try to capture all the pieces with the white knight on the board below."
        ],
        board: [
            0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0,
            0, 3, 3, 3, 0, 0,
            0, 3, 6, 3, 0, 0,
            0, 3, 3, 3, 0, 0,
            0, 0, 0, 0, 0, 0,
        ]
    },
    rook: {
        image: "img/rook_light.png",
        title: "Rook",
        text: [
            "Rooks are the powerful defenses that support your army back home. They can move straight left, right, up, and down. They can move as far as possible until they are blocked.",
            "Capture the black rook with the white rook on the board below."
        ],
        board: [
            0, 0, 0, 0, 0, 10,
            3, 0, 3, 3, 3, 3,
            3, 0, 3, 0, 0, 0,
            3, 0, 0, 0, 3, 0,
            3, 3, 3, 3, 0, 0,
            11, 0, 0, 0, 0, 0,
        ]
    },
    queen: {
        image: "img/queen_light.png",
        title: "Queen",
        text: [
            "The queen is the strongest piece in the game. She can move in all directions, as far as she wants.",
            "Move the white queen on the board below."
        ],
        board: [
            0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 3, 0,
            0, 0, 14, 0, 0, 0,
            0, 0, 0, 0, 7, 0,
            0, 3, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0,
        ]
    },
    king: {
        image: "img/king_light.png",
        title: "King",
        text: [
            "The king is the most important piece of the board. You have to protect him at all costs. Normally, he can move to any square next to him.",
            "Move the king on the board below."
        ],
        board: [
            0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0,
            0, 0, 0, 18, 0, 0,
            0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0,
        ]
    },

    check1: {
        title: "Check",
        text: [
            "Check is when one player is about to capture the other's king. If your opponent puts you in check, you have to do whatever it takes to get out of check. You can either move your king out of the way, or put one of your pieces in the way. Get the white king out of check on the board below.",
            "Move the king on the board below."
        ],
        board: [
            0, 6, 0, 18, 0, 0,
            0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0,
            0, 0, 0, 11, 0, 0,
            0, 0, 0, 0, 0, 0,
        ]
    },

    check2: {
        title: "Checkmate",
        text: [
            "Sometimes, a player is in check, but can't get out. This is called checkmate. If you checkmate your opponent, you win, and if you get checkmated, you lose.",
            "White is in checkmate on the board below."
        ],
        board: [
            0, 11, 0, 18, 0, 0,
            0, 0, 0, 0, 0, 0,
            0, 0, 0, 19, 0, 0,
            0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0,
        ]
    },

    moveon: {
        text: [
            "",
            "This has been a basic overview of the game, but the best way to learn is to jump in and play a game."
        ]
    }
}