import React from 'react';

interface ScreenTwoProps {
  onNext: () => void;
}

const ScreenTwo: React.FC<ScreenTwoProps> = ({ onNext }) => {
  return (
    <div className="flex flex-col items-center">
      <h1 className="text-2xl font-bold">Choose Your Risk Appetite</h1>
      <div className="mt-8 flex justify-around w-full max-w-md">
        {['Low', 'Medium', 'High'].map((risk, index) => (
          <div key={index} className="flex flex-col items-center cursor-pointer">
            <img
              src="https://via.placeholder.com/100"
              alt={`${risk} Risk`}
              className="w-24 h-24 mb-2 rounded"
            />
            <p className="text-gray-600">{risk}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ScreenTwo;
