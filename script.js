document.getElementById('start-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const playerName = document.getElementById('player-name').value;
    const playerSymbol = document.getElementById('player-symbol').value;
    
    
    localStorage.setItem('playerName', playerName);
    localStorage.setItem('playerSymbol', playerSymbol);
    
    
    window.location.href = 'board.html';
});
