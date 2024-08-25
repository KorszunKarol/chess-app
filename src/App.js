import React, { lazy, Suspense, useState, useEffect } from 'react';

import './App.css';

const ChessGame = lazy(() => import('./components/ChessGame'));
const ScoreTracker = lazy(() => import('./components/ScoreTracker'));



function App() {
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(
    parseInt(localStorage.getItem('highScore')) || 0
  );


  useEffect(() => {
    const storedHighScore = localStorage.getItem('highScore');
    if (storedHighScore) {
      setHighScore(parseInt(storedHighScore));
    }
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-gray-100">
      <header className="bg-gray-800 text-white py-4 shadow-md">
        <h1 className="text-3xl font-bold uppercase tracking-wider text-center">Chess Evaluation Game</h1>
      </header>
      <main className="flex-grow flex flex-col items-center justify-center py-8 bg-gray-800">
        <div className="bg-gray-700 rounded-lg shadow-2xl p-8 max-w-6xl w-full h-[750px] mx-auto">
          <ChessGame
            setScore={setScore}
            highScore={highScore}
            setHighScore={setHighScore}
          />
          <ScoreTracker score={score} highScore={highScore} />
        </div>
      </main>
      <footer className="bg-gray-800 text-white py-4 text-center">
        <p>&copy; 2023 Chess Evaluation Game. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;