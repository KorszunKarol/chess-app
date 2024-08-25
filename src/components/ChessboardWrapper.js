import {Chessboard} from 'react-chessboard';

function ChessboardWrapper({ position, turn }) {
  const isBlackTurn = turn === 'b';

  return (
    <div className={`chessboard-container ${isBlackTurn ? 'flipped' : ''}`}>
      <Chessboard
        position={position}
        width={720}
        draggable={false}
        arePiecesDraggable={false}
        boardOrientation={isBlackTurn ? 'black' : 'white'}
        animationDuration={100}
        customDarkSquareStyle={{ backgroundColor: '#4A606B ' }}
        customLightSquareStyle={{ backgroundColor: '#E6E6E6' }}
      />
    </div>
  );
}
export default ChessboardWrapper;