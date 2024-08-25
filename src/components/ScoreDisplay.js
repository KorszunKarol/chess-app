import React, { useState, useEffect } from 'react';
import './ScoreDisplay.css';

const ScoreDisplay = ({ score }) => {
  const [animatedScore, setAnimatedScore] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
    const timer = setInterval(() => {
      setAnimatedScore(prev => {
        if (prev < score) return Math.min(prev + 1, score);
        clearInterval(timer);
        return prev;
      });
    }, 20);
    return () => clearInterval(timer);
  }, [score]);

  let colorClass, message;
  if (score >= 85) {
    colorClass = 'score-green';
    message = 'Excellent!';
  } else if (score >= 60) {
    colorClass = 'score-orange';
    message = 'Good effort!';
  } else {
    colorClass = 'score-red';
    message = 'Keep practicing!';
  }

  return (
    <div className={`score-display ${visible ? 'fade-in' : 'fade-out'}`}>
      <div className={`score-circle ${colorClass}`}>
        <span className="score-value">{animatedScore}</span>
      </div>
      <div className="score-message">{message}</div>

    </div>
  );
};

export default ScoreDisplay;