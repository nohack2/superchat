import React, { useState } from 'react';
import Dropdown from './DropDown';

interface ScreenOneProps {
  formData: { [key: string]: string };
  handleChange: (name: string, value: string) => void;
}

const ScreenOne: React.FC<ScreenOneProps> = ({ formData, handleChange }) => {

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-3xl font-bold">Welcome, Alpha Trader</h1>
      <p className="mt-4 text-gray-600 text-center">Subheading text goes here</p>
      <form className="mt-8 w-full max-w-md">
        <div className="grid grid-cols-2 gap-4">
          {/* Dropdowns */}
          <Dropdown
            name="age"
            value={formData.age}
            defaultLabel='Select your age'
            options={["10-20", "20-40", "40-60"]}
            onChange={handleChange}
            required
          />
          <Dropdown
            name="investmentExperience"
            defaultLabel='Investment Experience'
            value={formData.investmentExperience}
            options={["10-20", "20-40", "40-60"]}
            onChange={handleChange}
            required
          />
          <Dropdown
            name="investmentKnowledge"
            defaultLabel='Investment Knowledge'
            value={formData.investmentKnowledge}
            options={["10-20", "20-40", "40-60"]}
            onChange={handleChange}
            required
          />
          <Dropdown
            name="liquidityNeeds"
            defaultLabel='Select your liquidity needs'
            value={formData.liquidityNeeds}
            options={["10-20", "20-40", "40-60"]}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mt-4">
          <Dropdown
            name="financialObligations"
            defaultLabel='Dependents and financial obligations'
            value={formData.financialObligations}
            options={["10-20", "20-40", "40-60"]}
            onChange={handleChange}
            required
          />
        </div>
      </form>
    </div>
  );
};

export default ScreenOne;
