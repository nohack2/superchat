import React from 'react';

interface ScreenThreeProps {
  onNext: () => void;
}

const ScreenThree: React.FC<ScreenThreeProps> = ({ onNext }) => {
  return (
    <div className="flex flex-col items-center">
      <h1 className="text-2xl font-bold">Select Your Investment Style</h1>
      <img
        src="https://via.placeholder.com/200"
        alt="Investment Style"
        className="mt-6 mb-6"
      />
      <div className="grid grid-cols-2 gap-4">
        {['Style 1', 'Style 2', 'Style 3', 'Style 4'].map((style, index) => (
          <button key={index} className="border p-4 rounded w-full">
            {style}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ScreenThree;
