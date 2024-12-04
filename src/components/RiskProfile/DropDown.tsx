import React from 'react';

interface DropdownProps {
  name: string;
  options: string[];
  value: string;
  defaultLabel: string,
  onChange: (name: string, value: string) => void;
  required?: boolean;
}

const Dropdown: React.FC<DropdownProps> = ({ name, defaultLabel, options, value, onChange, required = false }) => {
  return (
    <div className="w-full mb-4">
      <select
        name={name}
        value={value}
        onChange={(e) => onChange(name, e.target.value)}
        className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-black"
      >
        <option value="" disabled>
          {defaultLabel}
        </option>
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
      {/* {required && !value && (
        <p className="text-red-500 text-sm mt-1">This field is required.</p>
      )} */}
    </div>
  );
};

export default Dropdown;
