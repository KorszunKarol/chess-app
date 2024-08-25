import * as tf from '@tensorflow/tfjs';
import { useState, useEffect } from 'react';

function useAIModel() {
  const [model, setModel] = useState(null);

  useEffect(() => {
    async function loadModel() {
      const loadedModel = await tf.loadGraphModel('public/tfjs_model/model.json');
      setModel(loadedModel);
    }
    loadModel();
  }, []);

  async function getModelEvaluation(fen) {
    if (!model) return null;
    const input = prepareInput(fen);
    console.log("input", input);
    const prediction = await model.predict(input);
    const result = prediction.dataSync()[0];
    return result;
  }

  function expandToInput(inputVector) {
    const chessboard = new Array(8).fill(0).map(() =>
      new Array(8).fill(0).map(() => new Array(12).fill(0))
    );

    const chessboardVector = inputVector.slice(0, 64);

    for (let i = 0; i < chessboardVector.length; i++) {
      const pieceCode = chessboardVector[i];
      if (pieceCode !== 0) {
        let channelIndex;
        if (pieceCode < 0) {
          channelIndex = -pieceCode + 5;
        } else {
          channelIndex = pieceCode - 1;
        }
        const row = Math.floor(i / 8);
        const col = i % 8;
        chessboard[row][col][channelIndex] = 1.0;
      }
    }

    return chessboard;
  }

  function convertFenToMatrix(fen) {
    const matrix = [];
    const fenChars = fen.split('');
    let i = 0;

    while (i < fenChars.length) {
      const char = fenChars[i];
      if (char === '/') {
        i++;
        continue;
      }
      if (char === ' ') {
        const nextChar = fenChars[i + 1];
        matrix.push(nextChar === 'w' ? 1 : 0);
        break;
      }

      const num = parseInt(char);
      if (!isNaN(num)) {
        for (let j = 0; j < num; j++) {
          matrix.push(0);
        }
      } else {
        const piece = getPieceValue(char);
        matrix.push(piece);
      }
      i++;
    }

    matrix.push(getMaterialScore(matrix.slice(0, -1)));
    return matrix;
  }

  function getPieceValue(char) {
    const pieceValues = {
      'p': -1, 'n': -2, 'b': -3, 'r': -4, 'q': -5, 'k': -6,
      'P': 1, 'N': 2, 'B': 3, 'R': 4, 'Q': 5, 'K': 6
    };
    return pieceValues[char] || 0;
  }

  function getMaterialScore(board) {
    return board.reduce((sum, piece) => sum + Math.abs(piece), 0);
  }

  function prepareInput(pos) {
    const matrix = convertFenToMatrix(pos);
    const expandedInput = expandToInput(matrix);
    return tf.tensor4d([expandedInput], [1, 8, 8, 14]);
  }

  return {
    getModelEvaluation
  };
}

export default useAIModel;