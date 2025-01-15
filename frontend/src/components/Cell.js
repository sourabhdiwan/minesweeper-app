import React from 'react';

const Cell = ({ row, col, revealed, mine, revealCell }) => {
  const getCellStyle = () => {
    if (revealed) {
      return mine ? 'bg-red-500' : 'bg-gray-600';
    }
    return 'bg-gray-800 hover:bg-gray-600';
  };

  return (
    <div
      className={`cell w-12 h-12 border-2 rounded-md flex justify-center items-center ${getCellStyle()}`}
      onClick={() => revealCell(row, col)}
    >
      {revealed && mine && <span>💣</span>}
    </div>
  );
};

export default Cell;
