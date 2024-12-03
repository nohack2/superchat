import React from 'react';

interface ScreenOneProps {
  onNext: () => void;
}

const ScreenOne: React.FC<ScreenOneProps> = ({ onNext }) => {
  return (
    <div className="flex flex-col items-center">
      <h1 className="text-3xl font-bold">Welcome, Alpha Trader</h1>
      <p className="mt-4 text-gray-600 text-center">Subheading text goes here</p>
      <form className="mt-8 w-full max-w-md">
        <div className="grid grid-cols-2 gap-4">
          {/* Dropdowns */}
          <select className="border p-2 rounded">
            <option>Select Option 1</option>
          </select>
          <select className="border p-2 rounded">
            <option>Select Option 2</option>
          </select>
          <select className="border p-2 rounded">
            <option>Select Option 3</option>
          </select>
          <select className="border p-2 rounded">
            <option>Select Option 4</option>
          </select>
        </div>
        <div className="mt-4">
          <select className="w-full border p-2 rounded">
            <option>Select Option 5</option>
          </select>
        </div>
      </form>
    </div>
  );
};

export default ScreenOne;
