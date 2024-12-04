import React, { useState } from 'react';

interface ScreenFiveProps {
  formData: { [key: string]: string };
  handleChange: (name: string, value: string) => void;
}

const ScreenFive: React.FC<ScreenFiveProps> = ({ formData, handleChange }) => {
  // Initialize state with the existing value if available
  const [selectedGoal, setSelectedGoal] = useState(formData.currentFinancialSituation || '');

  const handleGoalClick = (situation: string) => {
    setSelectedGoal(situation);
    handleChange('currentFinancialSituation', situation); // Update formData with selected goal
  };

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-2xl font-bold">How would you describe your current financial situation?</h1>
      <div className="mt-8 flex justify-around w-full">
        {['Very stable', 'Stable', 'Somewhat stable', 'Unstable'].map((situation, index) => (
          <div key={index} className={`flex flex-col items-center cursor-pointer px-5 ${
            selectedGoal === situation
              ? 'border-black bg-gray-200'
              : 'border-gray-300 hover:bg-gray-100'
          }`} onClick={() => handleGoalClick(situation)}>
            <img
              src="https://via.placeholder.com/100"
              alt={`${situation} Risk`}
              className="w-24 h-24 mb-2 rounded"
            />
            <p className="text-gray-600">{situation}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ScreenFive;
