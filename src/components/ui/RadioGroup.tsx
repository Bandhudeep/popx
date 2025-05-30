import React from 'react';

interface RadioOption {
  value: boolean;
  label: string;
}

interface RadioGroupProps {
  options: RadioOption[];
  name: string;
  value: boolean;
  onChange: (value: boolean) => void;
  label?: string;
}

const RadioGroup: React.FC<RadioGroupProps> = ({
  options,
  name,
  value,
  onChange,
  label,
}) => {
  return (
    <div className="mb-4">
      {label && <p className="text-sm font-medium text-gray-700 mb-2">{label}</p>}
      <div className="flex space-x-6">
        {options.map((option) => (
          <div key={option.label} className="flex items-center">
            <input
              id={`${name}-${option.label}`}
              name={name}
              type="radio"
              className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300"
              checked={value === option.value}
              onChange={() => onChange(option.value)}
            />
            <label
              htmlFor={`${name}-${option.label}`}
              className="ml-2 block text-sm font-medium text-gray-700"
            >
              {option.label}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RadioGroup;