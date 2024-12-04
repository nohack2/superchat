import React, { useState } from 'react';

interface ScreenThreeProps {
  formData: { [key: string]: string };
  handleChange: (name: string, value: string) => void;
}

const ScreenThree: React.FC<ScreenThreeProps> = ({ formData, handleChange }) => {
  // Initialize state with the existing value if available
  const [selectedGoal, setSelectedGoal] = useState(formData.investmentHorizon || '');

  const handleGoalClick = (range: string) => {
    setSelectedGoal(range);
    handleChange('investmentHorizon', range); // Update formData with selected goal
  };

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-2xl font-bold">What is Your investment horizon?</h1>
      <img
        src="https://via.placeholder.com/200"
        alt="Investment Style"
        className="mt-6 mb-6"
      />
      <div className="grid grid-cols-2 gap-8 gap-x-24">
        {['Less than 1 year', '1-3 years', '3-5 years', 'More than 5 years'].map((range, index) => (
          <button key={index} className={`border p-4 rounded w-full ${
            selectedGoal === range
              ? 'border-black bg-gray-200'
              : 'border-gray-300 hover:bg-gray-100'
          }`} onClick={() => handleGoalClick(range)}>
            {range}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ScreenThree;
