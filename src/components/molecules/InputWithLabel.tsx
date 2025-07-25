// src/components/molecules/InputWithLabel.tsx
import React from "react";
import Input from "../atoms/Input";

interface InputWithLabelProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  required?: boolean;
  placeholder?: string;
}

const InputWithLabel: React.FC<InputWithLabelProps> = ({
  label,
  name,
  value,
  onChange,
  type = "text",
  required = false,
  placeholder,
}) => {
  return (
    <div className="mb-6">
      <label className="block mb-2 text-sm font-medium text-gray-700">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <Input
        name={name}
        value={value}
        onChange={onChange}
        type={type}
        placeholder={placeholder || `Enter ${label}`}
      />
    </div>
  );
};

export default InputWithLabel;
