import React, { useState } from 'react';

interface ScreenTwoProps {
  formData: { [key: string]: string };
  handleChange: (name: string, value: string) => void;
}

const ScreenTwo: React.FC<ScreenTwoProps> = ({ formData, handleChange }) => {
  // Initialize state with the existing value if available
  const [selectedGoal, setSelectedGoal] = useState(formData.investmentGoal || '');

  const handleGoalClick = (goal: string) => {
    setSelectedGoal(goal);
    handleChange('investmentGoal', goal); // Update formData with selected goal
  };

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-4">What is your primary investment goal?</h1>
      <div className="mt-8 flex justify-around w-full flex-wrap">
        {[
          'Capital Preservation',
          'Income Generation',
          'Balanced Growth',
          'Capital Appreciation',
          'Speculation',
        ].map((goal, index) => (
          <div
            key={index}
            className={`flex flex-col items-center cursor-pointer px-5 py-3 border rounded-lg m-2
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

export default ScreenTwo;
