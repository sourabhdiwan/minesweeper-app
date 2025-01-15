import React from 'react';

const Header = ({ startGame, resetGame }) => {
  return (
    <div className="header text-center mt-8">
      <h1 className="text-4xl font-bold">Minesweeper Game</h1>
      <button
        onClick={startGame}
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-4"
      >
        Start Game
      </button>
    </div>
  );
};

export default Header;
