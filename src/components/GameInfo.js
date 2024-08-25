import React from 'react';

function GameInfo({ turn, moves }) {
  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow">
      <p className="font-semibold text-gray-300">Turn: <span className="text-blue-400">{turn === 'w' ? 'White' : 'Black'}</span></p>
      <p className="font-semibold text-gray-300">Move number: <span className="text-blue-400">{Math.floor(moves / 2)}</span></p>
    </div>
  );
}

export default GameInfo;