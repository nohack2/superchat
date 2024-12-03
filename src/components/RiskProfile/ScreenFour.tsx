import React from 'react';

interface ScreenFourProps {
  onNext: () => void;
}

const ScreenFour: React.FC<ScreenFourProps> = ({ onNext }) => {
  return (
    <div className="flex flex-col items-center">
      <h1 className="text-2xl font-bold">Choose Your Market Preferences</h1>
      <div className="grid grid-cols-2 gap-4 mt-8">
        {['Market 1', 'Market 2', 'Market 3', 'Market 4'].map((market, index) => (
          <select key={index} className="border p-2 rounded w-full">
            <option value="">{market}</option>
            <option value="option1">Option 1</option>
            <option value="option2">Option 2</option>
          </select>
        ))}
      </div>
    </div>
  );
};

export default ScreenFour;
