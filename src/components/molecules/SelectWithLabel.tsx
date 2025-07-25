// src/components/molecules/SelectWithLabel.tsx
import React from "react";
import CustomSelect, { Option } from "../atoms/CustomSelect";

interface SelectWithLabelProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: { target: { name: string; value: string } }) => void;
  options: Option[];
  required?: boolean;
}

const SelectWithLabel: React.FC<SelectWithLabelProps> = ({
  label,
  name,
  value,
  onChange,
  options,
  required = false,
}) => {
  return (
    <div className="mb-6">
      <label className="block mb-2 text-sm font-medium text-gray-700">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <CustomSelect
        value={value}
        onChange={(val) => onChange({ target: { name, value: val } })}
        options={options}
        placeholder={`Select ${label}`}
      />
    </div>
  );
};

export default SelectWithLabel;
