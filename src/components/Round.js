import React from 'react';
import ChessboardWrapper from './ChessboardWrapper';
import GameControls from './GameControls';

function Round({
  game,
  fen,
  userEvaluation,
  setUserEvaluation,
  onEvaluationSubmit,
  onNewPosition,
  showResult,
  evaluationScore,
  aiEvaluation,
  aiEvaluationScore,
  actualEvaluation,
  roundNumber
}) {
  return (
    <div className="round">
      <h2>Round {roundNumber}</h2>
      <div className="chess-game-board">
        <ChessboardWrapper position={fen} turn={game.turn()} />
      </div>
      <GameControls
        game={game}
        userEvaluation={userEvaluation}
        setUserEvaluation={setUserEvaluation}
        onEvaluationSubmit={onEvaluationSubmit}
        onNewPosition={onNewPosition}
        showResult={showResult}
        evaluationScore={evaluationScore}
        aiEvaluation={aiEvaluation}
        aiEvaluationScore={aiEvaluationScore}
        actualEvaluation={actualEvaluation}
      />
    </div>
  );
}

export default Round;