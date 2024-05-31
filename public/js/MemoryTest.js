const board = document.getElementById('game-board');
const startButton = document.getElementById('start-button');
const statusDiv = document.getElementById('status');
let size = 3;
let activeSquares = [];
let userSelections = [];
let level = 1;
const baseTime = 3000; // Base time in milliseconds
const minTime = 1000; // Minimum time in milliseconds

startButton.addEventListener('click', startGame);

function startGame() {
    try {
        startButton.disabled = true;
        userSelections = [];
        board.innerHTML = '';
        statusDiv.textContent = `Level ${level}`;
        board.style.gridTemplateColumns = `repeat(${size}, 50px)`;
        board.style.gridTemplateRows = `repeat(${size}, 50px)`;
        generateSquares(size);
        showActiveSquares();
        const displayTime = Math.max(baseTime - (level - 1) * 200, minTime);
        setTimeout(hideActiveSquares, displayTime);
    } catch (error) {
        handleError(error);
    }
}

function generateSquares(size) {
    try {
        for (let i = 0; i < size * size; i++) {
            const square = document.createElement('div');
            square.classList.add('square');
            square.dataset.index = i;
            square.addEventListener('click', handleSquareClick);
            board.appendChild(square);
        }
    } catch (error) {
        handleError(error);
    }
}

function showActiveSquares() {
    try {
        activeSquares = [];
        const squares = document.querySelectorAll('.square');
        const activeCount = Math.min(size * size, level + 2);

        while (activeSquares.length < activeCount) {
            const randomIndex = Math.floor(Math.random() * squares.length);
            if (!activeSquares.includes(randomIndex)) {
                activeSquares.push(randomIndex);
                squares[randomIndex].classList.add('active');
            }
        }
    } catch (error) {
        handleError(error);
    }
}

function hideActiveSquares() {
    try {
        const squares = document.querySelectorAll('.square');
        squares.forEach(square => square.classList.remove('active'));
        setTimeout(() => statusDiv.textContent = 'Find the active squares!', 100);
    } catch (error) {
        handleError(error);
    }
}

function handleSquareClick(event) {
    try {
        const index = parseInt(event.target.dataset.index);
        if (activeSquares.includes(index)) {
            if (!userSelections.includes(index)) {
                userSelections.push(index);
                event.target.classList.add('active');
            }
            if (userSelections.length === activeSquares.length) {
                checkUserSelections();
            }
        } else {
            endGame();
        }
    } catch (error) {
        handleError(error);
    }
}

function checkUserSelections() {
    try {
        const correctSelections = userSelections.every(index => activeSquares.includes(index));
        if (correctSelections) {
            level++;
            size = Math.min(10, size + 1);
            statusDiv.textContent = `Correct! Level up to ${level}`;
        } else {
            endGame();
        }
        setTimeout(() => startButton.disabled = false, 1000);
    } catch (error) {
        handleError(error);
    }
}

function endGame() {
    statusDiv.textContent = `Game over! You reached level ${level}`;
    level = 1;
    size = 3;
    startButton.disabled = false;
}

function handleError(error) {
    console.error(error);
    statusDiv.textContent = 'An error occurred. Please try again.';
    startButton.disabled = false;
}
