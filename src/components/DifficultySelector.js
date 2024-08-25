import React from 'react';

function DifficultySelector({ difficulty, setDifficulty }) {
  return (
    <div className="space-y-2">
      <label htmlFor="difficulty" className="block text-sm font-medium text-gray-700">
        Difficulty:
      </label>
      <select
        id="difficulty"
        value={difficulty}
        onChange={(e) => setDifficulty(e.target.value)}
        className="block w-full mt-1 rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
      >
        <option value="easy">Easy</option>
        <option value="medium">Medium</option>
        <option value="hard">Hard</option>
      </select>
    </div>
  );
}

export default DifficultySelector;