import React from 'react';
import GameInfo from './GameInfo';
import EvaluationForm from './EvaluationForm';
import EvaluationDisplay from './EvaluationDisplay';
import './GameControls.css';
function GameControls({
  game,
  userEvaluation,
  setUserEvaluation,
  onEvaluationSubmit,
  onNewPosition,
  showResult,
  evaluationScore,
  aiEvaluation,
  aiEvaluationScore,
  actualEvaluation
}) {
  return (
    <div className="chess-game-controls">
      <GameInfo turn={game.turn()} moves={game.moveNumber()} />
      <EvaluationForm
        userEvaluation={userEvaluation}
        setUserEvaluation={setUserEvaluation}
        onSubmit={onEvaluationSubmit}
      />
      <button onClick={onNewPosition} className="new-position-btn">
        New Position
      </button>
      {showResult && evaluationScore !== null && (
        <EvaluationDisplay
          userEval={userEvaluation}
          aiEval={aiEvaluation}
          stockfishEval={actualEvaluation}
          playerScore={evaluationScore}
          aiScore={aiEvaluationScore}
        />
      )}
    </div>
  );
}

export default GameControls;
