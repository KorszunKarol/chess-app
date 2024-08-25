import React from 'react';

function ResultDisplay({ actualEvaluation, message }) {
  return (
    <div className="mt-6 p-4 bg-gray-800 rounded-lg">
      <p className="font-semibold text-gray-300">
        Actual evaluation: <span className="text-blue-400">{actualEvaluation !== null ? actualEvaluation / 100 : 'N/A'}</span>
      </p>
      <p className="mt-2 text-gray-400">{message}</p>
    </div>
  );
}

export default ResultDisplay;