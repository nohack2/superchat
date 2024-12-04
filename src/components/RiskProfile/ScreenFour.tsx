import React from 'react';
import Dropdown from './DropDown';

interface ScreenFourProps {
  formData: { [key: string]: string };
  handleChange: (name: string, value: string) => void;
}

const ScreenFour: React.FC<ScreenFourProps> = ({ formData, handleChange }) => {
  return (
    <div className="flex flex-col items-center">
      <h1 className="text-2xl font-bold">How do you approach financial risk?</h1>
      <img
        src="https://via.placeholder.com/200"
        alt="Investment Style"
        className="mt-6 mb-6"
      />
      <div className="grid grid-cols-2 gap-4 gap-x-20 mt-8">
      <Dropdown
            name="riskWillingness"
            value={formData.riskWillingness}
            defaultLabel='Willingness to take risk'
            options={["10-20", "20-40", "40-60"]}
            onChange={handleChange}
            required
          />

          {/* <select className="border p-2 rounded" value={selectedAge}>
            <option value="" disabled>Select your age</option>
            <option key='2' value="10-20">10-20</option>
            <option key='3' value="10-20">20-40</option>
            <option key='4' value="10-20">40-60</option>
          </select> */}
          <Dropdown
            name="marketVolatilityComfort"
            defaultLabel='Comfort with Market Volatility'
            value={formData.marketVolatilityComfort}
            options={["10-20", "20-40", "40-60"]}
            onChange={handleChange}
            required
          />
          <Dropdown
            name="marketDownturnReaction"
            defaultLabel='Reaction to Market Downturn'
            value={formData.marketDownturnReaction}
            options={["10-20", "20-40", "40-60"]}
            onChange={handleChange}
            required
          />
          {/* <select className="border p-2 rounded">
            <option value="" disabled hidden>Investment Experience</option>
            <option>10-20</option>
            <option>20-40</option>
            <option>40-60</option>
          </select> */}
          <Dropdown
            name="lossTolerance"
            defaultLabel='Loss Tolerance'
            value={formData.lossTolerance}
            options={["10-20", "20-40", "40-60"]}
            onChange={handleChange}
            required
          />
      </div>
    </div>
  );
};

export default ScreenFour;
