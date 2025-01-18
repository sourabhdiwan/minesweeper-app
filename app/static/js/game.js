document.addEventListener("DOMContentLoaded", function() {
    const gridSize = 5;  // For simplicity, using 5x5 grid (adjustable)
    const mineCount = 5; // Number of mines to place
    let grid = [];
    let revealedCells = 0;
    let totalCells = gridSize * gridSize;
    let isFirstMove = true; // Flag to track the first move

    // Initialize game state
    function initializeGrid() {
        grid = [];
        revealedCells = 0;

        // Create an empty grid with all cells as not a mine and not revealed
        for (let row = 0; row < gridSize; row++) {
            grid[row] = [];
            for (let col = 0; col < gridSize; col++) {
                grid[row][col] = {
                    isMine: false,
                    isRevealed: false,
                    isFlagged: false,
                    adjacentMines: 0
                };
            }
        }

        // Place mines randomly
        let placedMines = 0;
        while (placedMines < mineCount) {
            let row = Math.floor(Math.random() * gridSize);
            let col = Math.floor(Math.random() * gridSize);
            if (!grid[row][col].isMine) {
                grid[row][col].isMine = true;
                placedMines++;
            }
        }

        // Calculate adjacent mines for each cell
        for (let row = 0; row < gridSize; row++) {
            for (let col = 0; col < gridSize; col++) {
                if (!grid[row][col].isMine) {
                    let mineCount = 0;
                    // Check surrounding cells for mines
                    for (let r = row - 1; r <= row + 1; r++) {
                        for (let c = col - 1; c <= col + 1; c++) {
                            if (r >= 0 && c >= 0 && r < gridSize && c < gridSize && grid[r][c].isMine) {
                                mineCount++;
                            }
                        }
                    }
                    grid[row][col].adjacentMines = mineCount;
                }
            }
        }
    }

    // Create the HTML grid
    function createGridHTML() {
        const container = document.getElementById('game-container');
        container.innerHTML = "<h1>Welcome to Minesweeper</h1>";
        const gridElement = document.createElement('div');
        gridElement.classList.add('grid');

        for (let row = 0; row < gridSize; row++) {
            for (let col = 0; col < gridSize; col++) {
                let cell = document.createElement('div');
                cell.classList.add('cell');
                cell.dataset.row = row;
                cell.dataset.col = col;
                cell.addEventListener('click', revealCell);
                cell.addEventListener('contextmenu', flagCell);
                gridElement.appendChild(cell);
            }
        }
        container.appendChild(gridElement);

        // Add Reset Button
        const resetButton = document.createElement('button');
        resetButton.textContent = "Reset Game";
        resetButton.addEventListener('click', resetGame);
        container.appendChild(resetButton);
    }

    // Reveal the cell (left-click)
    function revealCell(event) {
        const row = event.target.dataset.row;
        const col = event.target.dataset.col;
        const cell = grid[row][col];

        if (cell.isRevealed || cell.isFlagged) return;

        cell.isRevealed = true;
        revealedCells++;

        const htmlCell = event.target;
        htmlCell.classList.add('revealed');

        if (cell.isMine) {
            htmlCell.classList.add('mine');
            htmlCell.innerHTML = '💣'; // Display mine
            endGame(false);
        } else {
            htmlCell.innerHTML = cell.adjacentMines > 0 ? cell.adjacentMines : '';
            if (cell.adjacentMines === 0) {
                // If there are no adjacent mines, reveal surrounding cells recursively
                revealAdjacentCells(row, col);
            }
        }

        // Check win condition only if it's not the first move
        if (!isFirstMove && revealedCells === totalCells - mineCount) {
            endGame(true);
        }

        // Set the first move flag to false after the first cell is revealed
        if (isFirstMove) {
            isFirstMove = false;
        }
    }

    // Flag the cell (right-click)
    function flagCell(event) {
        event.preventDefault(); // Prevent the default context menu
        const row = event.target.dataset.row;
        const col = event.target.dataset.col;
        const cell = grid[row][col];

        if (cell.isRevealed) return;

        cell.isFlagged = !cell.isFlagged;
        const htmlCell = event.target;
        htmlCell.classList.toggle('flagged');
        htmlCell.innerHTML = cell.isFlagged ? '🚩' : '';
    }

    // Reveal adjacent cells (for empty cells)
    function revealAdjacentCells(row, col) {
        for (let r = row - 1; r <= row + 1; r++) {
            for (let c = col - 1; c <= col + 1; c++) {
                if (r >= 0 && c >= 0 && r < gridSize && c < gridSize) {
                    const adjacentCell = grid[r][c];
                    const htmlAdjacentCell = document.querySelector(`[data-row='${r}'][data-col='${c}']`);
                    if (!adjacentCell.isRevealed && !adjacentCell.isMine) {
                        revealCell({ target: htmlAdjacentCell });
                    }
                }
            }
        }
    }

    // End the game (win or lose)
    function endGame(isWin) {
        // Disable all further interactions
        const message = isWin ? "You Win!" : "Game Over!";
        const resultMessage = document.createElement('p');
        resultMessage.textContent = message;
        document.getElementById('game-container').appendChild(resultMessage);

        // Optionally, reveal all cells
        for (let row = 0; row < gridSize; row++) {
            for (let col = 0; col < gridSize; col++) {
                const cell = grid[row][col];
                const htmlCell = document.querySelector(`[data-row='${row}'][data-col='${col}']`);
                if (cell.isMine) {
                    htmlCell.classList.add('mine');
                    htmlCell.innerHTML = '💣';
                } else if (cell.isRevealed) {
                    htmlCell.innerHTML = cell.adjacentMines > 0 ? cell.adjacentMines : '';
                }
            }
        }
    }

    // Reset the game
    function resetGame() {
        // Remove the previous result message
        const resultMessage = document.querySelector('p');
        if (resultMessage) {
            resultMessage.remove();
        }

        // Re-initialize the grid and start a new game
        initializeGrid();
        createGridHTML();
    }

    // Start a new game
    initializeGrid();
    createGridHTML();
});
