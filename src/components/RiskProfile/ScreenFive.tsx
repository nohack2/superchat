import React, { useState } from 'react';

interface ScreenFiveProps {
  formData: { [key: string]: string };
  handleChange: (name: string, value: string) => void;
}

const ScreenFive: React.FC<ScreenFiveProps> = ({ formData, handleChange }) => {
  // Initialize state with the existing value if available
  const [selectedGoal, setSelectedGoal] = useState(formData.marketVolatilityComfortRange || '');

  const handleGoalClick = (goal: string) => {
    setSelectedGoal(goal);
    handleChange('marketVolatilityComfortRange', goal); // Update formData with selected goal
  };

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-4">How comfortable are you with market volatility?</h1>
      <div className="mt-8 flex justify-around w-full flex-wrap">
        {[
          'Very uncomfortable',
          'Uncomfortable',
          'Neutral',
          'Comfortable',
          'Very comfortable',
        ].map((goal, index) => (
          <div
            key={index}
            className={`flex flex-col items-center cursor-pointer px-10 py-3 border rounded-lg m-2
              ${
                selectedGoal === goal
                  ? 'border-black bg-gray-200'
                  : 'border-gray-300 hover:bg-gray-100'
              }`}
            onClick={() => handleGoalClick(goal)}
          >
            <img
              src="https://via.placeholder.com/100"
              alt={`${goal}`}
              className="w-24 h-24 mb-2 rounded"
            />
            <p className="text-gray-600">{goal}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ScreenFive;
