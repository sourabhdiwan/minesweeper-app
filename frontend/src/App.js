import React, { useState, useEffect } from 'react';
import Board from './components/Board';
import Header from './components/Header';

function App() {
  const [gameStarted, setGameStarted] = useState(false);
  const [difficulty, setDifficulty] = useState('easy');
  const [highScores, setHighScores] = useState([]);

  useEffect(() => {
    const storedDifficulty = localStorage.getItem('difficulty');
    if (storedDifficulty) {
      setDifficulty(storedDifficulty);
    }

    const storedHighScores = JSON.parse(localStorage.getItem('highScores')) || [];
    setHighScores(storedHighScores);
  }, []);

  const startGame = () => {
    setGameStarted(true);
  };

  const handleChangeDifficulty = (newDifficulty) => {
    setDifficulty(newDifficulty);
    localStorage.setItem('difficulty', newDifficulty);
  };

  return (
    <div className="App">
      <Header />
      {!gameStarted ? (
        <div className="game-container">
          <h1>Minesweeper Game</h1>
          <div>
            <button onClick={startGame} className="reset">
              Start Game
            </button>
            <div className="difficulty-selector">
              <button onClick={() => handleChangeDifficulty('easy')}>Easy</button>
              <button onClick={() => handleChangeDifficulty('moderate')}>Moderate</button>
              <button onClick={() => handleChangeDifficulty('difficult')}>Difficult</button>
            </div>
          </div>
        </div>
      ) : (
        <Board difficulty={difficulty} />
      )}
      <div className="high-scores">
        <h2>High Scores</h2>
        <ul>
          {highScores.map((score, index) => (
            <li key={index}>
              {score.name}: {score.time} seconds
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
