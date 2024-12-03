import React from 'react';

interface ScreenFiveProps {
  onNext: () => void;
}

const ScreenFive: React.FC<ScreenFiveProps> = ({ onNext }) => {
  return (
    <div className="flex flex-col items-center">
      <h1 className="text-2xl font-bold">Choose Your Trading Frequency</h1>
      <div className="mt-8 flex justify-around w-full max-w-md">
        {['Daily', 'Weekly', 'Monthly'].map((frequency, index) => (
          <div key={index} className="flex flex-col items-center cursor-pointer">
            <img
              src="https://via.placeholder.com/100"
              alt={`${frequency} Trading`}
              className="w-24 h-24 mb-2 rounded"
            />
            <p className="text-gray-600">{frequency}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ScreenFive;
