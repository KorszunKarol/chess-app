import React from 'react';

function ScoreTracker({ score, highScore }) {
  return (
    <div className="mt-6 flex justify-between">
      <p className="font-semibold">Score: <span className="text-blue-600">{score}</span></p>
      <p className="font-semibold">High Score: <span className="text-blue-600">{highScore}</span></p>
    </div>
  );
}

export default ScoreTracker;