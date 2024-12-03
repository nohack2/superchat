import React from 'react';

interface ProgressIndicatorProps {
  step: number;
  totalSteps: number;
  onBack: () => void;
}

const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({ step, totalSteps, onBack }) => {
  const progressPercentage = (step / totalSteps) * 100;

  return (
    <div className="flex items-center justify-center w-full max-w-lg mx-auto pb-2">
      <button
        onClick={onBack}
        disabled={step === 1}
        className={`mr-4 ${step === 1 ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
      >
        <span className="text-2xl">&#8592;</span>
      </button>
      <div className="w-full">
        <div className="w-full h-2 bg-gray-300 rounded-full">
          <div
            className="h-2 bg-black rounded-full"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
        <div className="text-center text-sm text-gray-700 mt-1">
          Step {step} of {totalSteps}
        </div>
      </div>
    </div>
  );
};


export default ProgressIndicator;
