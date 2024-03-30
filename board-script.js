const playerName = localStorage.getItem('playerName');
const playerSymbol = localStorage.getItem('playerSymbol');
const cells = document.querySelectorAll('.cell');
const message = document.getElementById('message');
const playAgainButton = document.getElementById('play-again');

let currentPlayer = playerSymbol;
let board = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;


const updateGame = (index) => {
    board[index] = currentPlayer;
    displayBoard();
    
    const winner = checkWinner();
    if (winner) {
        endGame(`${winner} venceu!`);
    } else if (isBoardFull()) {
        endGame('Empate!');
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        message.textContent = `${currentPlayer === playerSymbol ? playerName : 'Computador'} é a sua vez.`;
    }
};


const displayBoard = () => {
    board.forEach((symbol, index) => {
        cells[index].textContent = symbol;
    });
};


const checkWinner = () => {
    const winningConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    for (let condition of winningConditions) {
        const [a, b, c] = condition;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            return board[a];
        }
    }
    return null;
};


const isBoardFull = () => {
    return board.every(cell => cell !== '');
};


const endGame = (messageText) => {
    gameActive = false;
    message.textContent = messageText;
};


const restartGame = () => {
    window.location.href = 'index.html'; 
};


playAgainButton.addEventListener('click', restartGame);


cells.forEach(cell => {
    cell.addEventListener('click', () => {
        const index = parseInt(cell.getAttribute('data-cell'));
        if (gameActive && board[index] === '') {
            updateGame(index);
            
            if (gameActive && currentPlayer !== playerSymbol) {
                const emptyCells = board.reduce((acc, val, idx) => {
                    if (val === '') acc.push(idx);
                    return acc;
                }, []);
                const randomIndex = emptyCells[Math.floor(Math.random() * emptyCells.length)];
                updateGame(randomIndex);
            }
        }
    });
});

message.textContent = `${currentPlayer === playerSymbol ? playerName : 'Computador'} é a sua vez.`;