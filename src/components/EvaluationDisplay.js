import React, { useState, useEffect } from 'react';
import './EvaluationDisplay.css';

const EvaluationDisplay = ({ userEval, aiEval, stockfishEval, playerScore, aiScore }) => {
  const [animatedPlayerScore, setAnimatedPlayerScore] = useState(0);
  const [animatedAiScore, setAnimatedAiScore] = useState(0);
  const formatEval = (evaluation) => parseFloat(evaluation).toFixed(2);

  useEffect(() => {
    const animationDuration = 1000; // 1 second
    const steps = 60;
    const playerIncrement = playerScore / steps;
    const aiIncrement = aiScore / steps;
    let currentStep = 0;

    const intervalId = setInterval(() => {
      if (currentStep < steps) {
        setAnimatedPlayerScore((prev) => Math.min(prev + playerIncrement, playerScore));
        setAnimatedAiScore((prev) => Math.min(prev + aiIncrement, aiScore));
        currentStep++;
      } else {
        clearInterval(intervalId);
      }
    }, animationDuration / steps);

    return () => clearInterval(intervalId);
  }, [playerScore, aiScore]);

  return (
    <div className="evaluation-display">
      <div className="eval-section">
        <div className="eval-item">
          <span className="eval-label">Your Eval</span>
          <span className="eval-value">{formatEval(userEval / 100)}</span>
        </div>
        <div className="eval-item">
          <span className="eval-label">AI Eval</span>
          <span className="eval-value">{formatEval(aiEval)}</span>
        </div>
        <div className="eval-item">
          <span className="eval-label">Stockfish Eval</span>
          <span className="eval-value">{formatEval(stockfishEval)}</span>
        </div>
      </div>
      <div className="score-container">
        <div className="score-circle player-score" style={{ '--score': animatedPlayerScore }}>
          <span className="score-value">{Math.round(animatedPlayerScore)}</span>
          <span className="score-label">You</span>
        </div>
        <div className="score-circle ai-score" style={{ '--score': animatedAiScore }}>
          <span className="score-value">{Math.round(animatedAiScore)}</span>
          <span className="score-label">AI</span>
        </div>
      </div>
    </div>
  );
};

export default EvaluationDisplay;