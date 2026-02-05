/**
 * Tic-Tac-Toe Game
 * A simple two-player game on the same device
 */

// Wait for DOM to fully load before running game logic
document.addEventListener('DOMContentLoaded', () => {
    
    // ========================================
    // Game State Variables
    // ========================================
    
    // Array representing the 3x3 board (9 cells)
    // Empty string = empty cell, 'X' or 'O' = player mark
    let board = ['', '', '', '', '', '', '', '', ''];
    
    // Current player: 'X' starts first
    let currentPlayer = 'X';
    
    // Flag to track if game is still active
    let gameActive = true;
    
    // ========================================
    // Winning Combinations
    // ========================================
    
    // All possible winning combinations (indices)
    // Rows: 0-1-2, 3-4-5, 6-7-8
    // Columns: 0-3-6, 1-4-7, 2-5-8
    // Diagonals: 0-4-8, 2-4-6
    const winningCombinations = [
        [0, 1, 2], // Top row
        [3, 4, 5], // Middle row
        [6, 7, 8], // Bottom row
        [0, 3, 6], // Left column
        [1, 4, 7], // Middle column
        [2, 5, 8], // Right column
        [0, 4, 8], // Diagonal top-left to bottom-right
        [2, 4, 6]  // Diagonal top-right to bottom-left
    ];
    
    // ========================================
    // DOM Element References
    // ========================================
    
    const cells = document.querySelectorAll('.cell');
    const statusBanner = document.getElementById('status');
    const statusText = statusBanner.querySelector('.status-text');
    const restartBtn = document.getElementById('restartBtn');
    
    // ========================================
    // Game Functions
    // ========================================
    
    /**
     * Updates the status banner text and styling
     * @param {string} message - The message to display
     * @param {string} type - The type of status ('x-turn', 'o-turn', 'winner-x', 'winner-o', 'draw')
     */
    function updateStatus(message, type) {
        statusText.textContent = message;
        // Remove all status classes
        statusBanner.classList.remove('x-turn', 'o-turn', 'winner-x', 'winner-o', 'draw');
        // Add the appropriate class
        if (type) {
            statusBanner.classList.add(type);
        }
    }
    
    /**
     * Handles a cell click event
     * @param {Event} event - The click event
     */
    function handleCellClick(event) {
        const cell = event.target;
        const index = parseInt(cell.getAttribute('data-index'));
        
        // Ignore click if cell is already filled or game is over
        if (board[index] !== '' || !gameActive) {
            return;
        }
        
        // Place the current player's mark
        board[index] = currentPlayer;
        cell.textContent = currentPlayer;
        cell.classList.add(currentPlayer.toLowerCase());
        
        // Check for win or draw
        if (checkWin()) {
            // Show winner message: "X wins!" or "O wins!"
            updateStatus(`${currentPlayer} wins!`, `winner-${currentPlayer.toLowerCase()}`);
            gameActive = false;
            disableAllCells();
            return;
        }
        
        if (checkDraw()) {
            // Show draw message
            updateStatus('Draw!', 'draw');
            gameActive = false;
            disableAllCells();
            // Apply draw tint to all cells
            applyDrawStyle();
            return;
        }
        
        // Switch to the other player
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        // Show turn message: "Turn: X" or "Turn: O"
        updateStatus(`Turn: ${currentPlayer}`, `${currentPlayer.toLowerCase()}-turn`);
    }
    
    /**
     * Checks if the current player has won
     * @returns {boolean} True if current player has won
     */
    function checkWin() {
        for (const combination of winningCombinations) {
            const [a, b, c] = combination;
            
            // Check if all three cells in this combination match and are not empty
            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                // Highlight the three winning cells
                highlightWinningCells(combination);
                return true;
            }
        }
        return false;
    }
    
    /**
     * Highlights the winning combination of cells with the 'winning' CSS class
     * @param {Array} combination - Array of winning cell indices
     */
    function highlightWinningCells(combination) {
        combination.forEach(index => {
            cells[index].classList.add('winning');
        });
    }
    
    /**
     * Checks if the game is a draw (all cells filled, no winner)
     * @returns {boolean} True if the game is a draw
     */
    function checkDraw() {
        // If no empty cells remain, it's a draw
        return board.every(cell => cell !== '');
    }
    
    /**
     * Disables all cells (prevents further clicks after game ends)
     */
    function disableAllCells() {
        cells.forEach(cell => {
            cell.classList.add('disabled');
        });
    }
    
    /**
     * Applies draw styling to all cells (subtle amber tint)
     */
    function applyDrawStyle() {
        cells.forEach(cell => {
            cell.classList.add('draw');
        });
    }
    
    /**
     * Resets the game to its initial state
     * Clears board, removes all cell classes (including winning highlight),
     * and restores normal cell styles
     */
    function restartGame() {
        // Reset game state
        board = ['', '', '', '', '', '', '', '', ''];
        currentPlayer = 'X';
        gameActive = true;
        
        // Clear all cells - remove text and ALL classes (x, o, winning, disabled, draw)
        cells.forEach(cell => {
            cell.textContent = '';
            cell.classList.remove('x', 'o', 'winning', 'disabled', 'draw');
        });
        
        // Reset status banner to show X's turn
        updateStatus('Turn: X', 'x-turn');
    }
    
    // ========================================
    // Event Listeners
    // ========================================
    
    // Add click listener to each cell
    cells.forEach(cell => {
        cell.addEventListener('click', handleCellClick);
    });
    
    // Add click listener to restart button
    restartBtn.addEventListener('click', restartGame);
    
    // Initialize status banner
    updateStatus('Turn: X', 'x-turn');
    
});
