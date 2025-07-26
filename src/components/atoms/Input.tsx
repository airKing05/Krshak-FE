// src/components/atoms/Input.tsx
import React from "react";

interface InputProps {
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  placeholder?: string;
  className?: string
}

const Input: React.FC<InputProps> = ({
  name,
  value,
  onChange,
  type = "text",
  placeholder = "",
  className = ""
}) => {
  return (
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`${className} w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200`}
    />
  );
};

export default Input;
