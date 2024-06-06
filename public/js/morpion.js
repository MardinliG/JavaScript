let currentPlayer = 'X';
let gameMode = 'pvp';
let board = ['', '', '', '', '', '', '', '', ''];
let gameOver = false;

function computerMove() {
    const bestMove = getBestMove();
    makeMove(document.querySelectorAll('.cell')[bestMove], bestMove);
}

function getBestMove() {
    let bestValue = -Infinity;
    let move = -1;
    for (let i = 0; i < board.length; i++) {
        if (board[i] === '') {
            board[i] = 'O';
            const moveValue = minimax(board, 0, false);
            board[i] = '';
            if (moveValue > bestValue) {
                bestValue = moveValue;
                move = i;
            }
        }
    }
    return move;
}

function minimax(board, depth, isMaximizing) {
    const score = evaluate(board);
    if (score !== 0) return score;
    if (board.every(cell => cell !== '')) return 0;

    if (isMaximizing) {
        let bestValue = -Infinity;
        for (let i = 0; i < board.length; i++) {
            if (board[i] === '') {
                board[i] = 'O';
                bestValue = Math.max(bestValue, minimax(board, depth + 1, false));
                board[i] = '';
            }
        }
        return bestValue;
    } else {
        let bestValue = Infinity;
        for (let i = 0; i < board.length; i++) {
            if (board[i] === '') {
                board[i] = 'X';
                bestValue = Math.min(bestValue, minimax(board, depth + 1, true));
                board[i] = '';
            }
        }
        return bestValue;
    }
}

function evaluate(board) {
    const winConditions = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6]            // Diagonals
    ];
    for (const condition of winConditions) {
        const [a, b, c] = condition;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            return board[a] === 'O' ? 10 : -10;
        }
    }
    return 0;
}

function checkWin() {
    const winConditions = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6]            // Diagonals
    ];
    return winConditions.some(condition =>
        condition.every(index => board[index] && board[index] === board[condition[0]]));
}

function showEndScreen(result) {
    const winScreen = document.getElementById('winScreen');
    const loseScreen = document.getElementById('loseScreen');
    const drawScreen = document.getElementById('drawScreen');
    winScreen.classList.add('hidden');
    loseScreen.classList.add('hidden');
    drawScreen.classList.add('hidden');
    if (result === 'win') {
        winScreen.classList.remove('hidden');
    } else if (result === 'lose') { // Si vous avez une logique pour perdre contre l'ordinateur
        loseScreen.classList.remove('hidden');
    } else if (result === 'draw') {
        drawScreen.classList.remove('hidden');
    }
}

function makeMove(cell, index) {
    if (gameOver) {
        displayMessage("La partie est terminée. Veuillez redémarrer le jeu.");
        return;
    }
    if (board[index] !== '') {
        displayMessage("Cette case est déjà prise. Veuillez choisir une autre case.");
        return;
    }
    board[index] = currentPlayer;
    cell.textContent = currentPlayer;
    let win = checkWin();
    let draw = checkDraw();
    if (win) {
        showEndScreen(currentPlayer === 'X' ? 'win' : 'lose');
        gameOver = true;
        return;
    } else if (draw) {
        showEndScreen('draw');
        gameOver = true;
        return;
    }
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    if (gameMode === 'pvc' && currentPlayer === 'O') {
        setTimeout(computerMove, 300); // Un léger délai avant que l'ordinateur ne joue
    }
}

function checkDraw() {
    return board.every(cell => cell !== '');
}

function startGame(mode) {
    // Réinitialise la grille et cache les écrans de fin de partie
    const endScreens = document.querySelectorAll('.end-screen');
    endScreens.forEach(screen => screen.classList.add('hidden'));
    gameMode = mode;
    currentPlayer = 'X';
    board = ['', '', '', '', '', '', '', '', ''];
    gameOver = false;
    const cells = document.querySelectorAll('.cell');
    cells.forEach(cell => cell.textContent = '');
    // ...
}

function displayMessage(msg) {
    const messageElement = document.getElementById('message');
    messageElement.textContent = msg;
    messageElement.classList.remove('hidden');
    setTimeout(() => { // Cache le message après 2 secondes
        messageElement.classList.add('hidden');
    }, 2000);
}

function resetGame() {
    startGame(gameMode); // Ou une autre logique de réinitialisation au besoin
}

startGame('pvp'); // Initialisation du jeu en mode PvP par défaut
