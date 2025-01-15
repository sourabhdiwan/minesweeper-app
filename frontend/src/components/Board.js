import React, { useState, useEffect } from 'react';

function Board({ difficulty }) {
  const [board, setBoard] = useState([]);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    initializeBoard();
  }, [difficulty]);

  const initializeBoard = () => {
    let rows, cols, mines;
    if (difficulty === 'easy') {
      rows = 8;
      cols = 8;
      mines = 10;
    } else if (difficulty === 'moderate') {
      rows = 16;
      cols = 16;
      mines = 40;
    } else if (difficulty === 'difficult') {
      rows = 16;
      cols = 30;
      mines = 99;
    }

    const newBoard = createBoard(rows, cols, mines);
    setBoard(newBoard);
  };

  const createBoard = (rows, cols, mines) => {
    const board = Array(rows).fill().map(() => Array(cols).fill({ revealed: false, mine: false, adjacentMines: 0 }));
    let placedMines = 0;

    // Randomly place mines
    while (placedMines < mines) {
      const row = Math.floor(Math.random() * rows);
      const col = Math.floor(Math.random() * cols);

      if (!board[row][col].mine) {
        board[row][col].mine = true;
        placedMines++;
      }
    }

    // Calculate adjacent mines for each cell
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        if (!board[row][col].mine) {
          let count = 0;
          for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {
              const r = row + i;
              const c = col + j;
              if (r >= 0 && r < rows && c >= 0 && c < cols && board[r][c].mine) {
                count++;
              }
            }
          }
          board[row][col].adjacentMines = count;
        }
      }
    }

    return board;
  };

  const handleCellClick = (row, col) => {
    if (gameOver) return;

    const newBoard = [...board];
    const cell = newBoard[row][col];
    if (cell.revealed) return;

    cell.revealed = true;

    if (cell.mine) {
      setGameOver(true);
    }

    setBoard(newBoard);
  };

  return (
    <div className="game-board" style={{ gridTemplateColumns: `repeat(${board[0]?.length}, 30px)` }}>
      {board.map((row, rowIndex) => (
        row.map((cell, colIndex) => (
          <div
            key={`${rowIndex}-${colIndex}`}
            className={`game-cell ${cell.revealed ? 'revealed' : ''} ${cell.mine ? 'mine' : ''}`}
            onClick={() => handleCellClick(rowIndex, colIndex)}
          >
            {cell.revealed && !cell.mine && cell.adjacentMines > 0 && cell.adjacentMines}
          </div>
        ))
      ))}
    </div>
  );
}

export default Board;
