import React from 'react';

function EvaluationForm({ userEvaluation, setUserEvaluation, onSubmit }) {
  // Nonlinear scaling function
  const scaleValue = (value) => {
    // Convert the range from -1000 to 1000 to -1 to 1
    const x = value / 1000;
    // Apply a cubic function to create nonlinear scaling
    return Math.sign(x) * Math.pow(Math.abs(x), 3) * 1000;
  }

  // Inverse scaling function to convert back to linear for the slider
  const inverseScaleValue = (value) => {
    // Convert the range from -1000 to 1000 to -1 to 1
    const x = value / 1000;
    // Apply the inverse of the cubic function
    return Math.sign(x) * Math.pow(Math.abs(x), 1/3) * 1000;
  }

  const handleSliderChange = (e) => {
    const linearValue = parseInt(e.target.value);
    setUserEvaluation(Math.round(scaleValue(linearValue)));
  };

  return (
    <form onSubmit={onSubmit} className="bg-gray-700 shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <div className="mb-4">
        <label htmlFor="evaluation-slider" className="block text-gray-300 text-lg font-bold mb-2 text-center">
          Your Evaluation:
        </label>
        <div className="flex items-center space-x-4">
          <input
            id="evaluation-slider"
            type="range"
            min="-1000"
            max="1000"
            value={inverseScaleValue(userEvaluation)}
            onChange={handleSliderChange}
            className="w-full h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer"
            style={{ width: '100%', maxWidth: '100%' }} // Adjusted width to be responsive
          />
          <span className="text-gray-300 font-bold w-20 text-right">{(userEvaluation / 100).toFixed(2)}</span>
        </div>
      </div>
      <div className="flex items-center justify-between mt-6"> {/* Added margin-top */}
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105"
        >
          Submit Evaluation
        </button>
      </div>
    </form>
  );
}

export default EvaluationForm;