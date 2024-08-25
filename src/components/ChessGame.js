import React, { useState, useEffect } from 'react';
import { Chess } from 'chess.js';
import ChessboardWrapper from './ChessboardWrapper';
import stockfishService from './StockfishService';
import GameControls from './GameControls';
import './ChessGame.css';
import Round from './Round';

function ChessGame({ setScore, highScore, setHighScore, difficulty }) {
  const [game, setGame] = useState(new Chess());
  const [fen, setFen] = useState('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1');
  const [userEvaluation, setUserEvaluation] = useState(0);
  const [actualEvaluation, setActualEvaluation] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [evaluationScore, setEvaluationScore] = useState(null);
  const [aiEvaluation, setAiEvaluation] = useState(null);
  const [aiEvaluationScore, setAiEvaluationScore] = useState(null);
  const [currentRound, setCurrentRound] = useState(1);
  const [totalScore, setTotalScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);


  useEffect(() => {
    newPosition();
  }, []);

  const newPosition = () => {
    const newGame = new Chess();
    const numberOfMoves = Math.floor(Math.random() * 2) + 3;

    for (let i = 0; i < numberOfMoves; i++) {
      const possibleMoves = newGame.moves();
      if (possibleMoves.length === 0) break;
      const randomMove = possibleMoves[Math.floor(Math.random() * possibleMoves.length)];
      newGame.move(randomMove);
    }

    setGame(newGame);
    const newFen = newGame.fen();
    stockfishService.setPosition(newFen);
    stockfishService.getEvaluation((evaluation) => {
      setActualEvaluation(evaluation / 100);
    });

    setFen(newFen);
    setUserEvaluation(0);

    setShowResult(false);
  };

  const calculateScore = (userEval, actualEval) => {
    const difference = Math.abs(userEval - actualEval);
    console.log("------------------------------------")
    console.log("difference", difference);
    console.log("userEval", userEval);
    console.log("actualEval", actualEval);
    console.log("------------------------------------")
    // Increase the tolerance for sign differences

    const signMultiplier = Math.sign(userEval) === Math.sign(actualEval) ? 1 : 1.5;

    let error = difference * signMultiplier;

    const magnitudeAdjustment = 1 / (1 + Math.abs(actualEval) / 13);
    error *= magnitudeAdjustment;

    const score = Math.max(1, Math.min(100, Math.round(100 * Math.exp(-error / 3))));

    return score;
  };

const handleEvaluationSubmit = async (e) => {
    if (e) e.preventDefault();

    const aiEvaluation = await getModelEvaluation(fen);
    setAiEvaluation(aiEvaluation);

    const userScore = calculateScore(userEvaluation / 100, actualEvaluation);
    const aiScore = calculateScore(aiEvaluation, actualEvaluation);
    setEvaluationScore(userScore);
    setAiEvaluationScore(aiScore);
    setShowResult(true);

    setTotalScore(prevScore => prevScore + userScore);

    if (currentRound === 5) {
      setGameOver(true);
      setScore(totalScore + userScore);
      if (totalScore + userScore > highScore) {
        setHighScore(totalScore + userScore);
      }
    } else {
      setCurrentRound(prevRound => prevRound + 1);
    }
  };

  const startNewGame = () => {
    setCurrentRound(1);
    setTotalScore(0);
    setGameOver(false);
    newPosition();
  };

  if (gameOver) {
    return (
      <div className="game-summary">
        <h2>Game Over</h2>
        <p>Your total score: {totalScore}</p>
        <p>High score: {highScore}</p>
        <button onClick={startNewGame}>Play Again</button>
      </div>
    );
  }

  return (
    <div className="chess-game-container">
      <Round
        game={game}
        fen={fen}
        userEvaluation={userEvaluation}
        setUserEvaluation={setUserEvaluation}
        onEvaluationSubmit={handleEvaluationSubmit}
        onNewPosition={newPosition}
        showResult={showResult}
        evaluationScore={evaluationScore}
        aiEvaluation={aiEvaluation}
        aiEvaluationScore={aiEvaluationScore}
        actualEvaluation={actualEvaluation}
        roundNumber={currentRound}
      />
      <div className="game-info">
        <p>Round: {currentRound} / 5</p>
        <p>Total Score: {totalScore}</p>
      </div>
    </div>
  );
}

export default ChessGame;