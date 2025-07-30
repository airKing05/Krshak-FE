// src/components/atoms/Input.tsx
import React, { useEffect, useState } from "react";

interface InputProps {
  name: string;
  value?: string;
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
  const [maxDate, setMaxDate] = useState('');

  useEffect(() => {
    // Only calculate maxDate if the input type is "date"
    if (type === 'date') {
      const today = new Date();
      const formattedDate = today.toISOString().split('T')[0]; 
      setMaxDate(formattedDate);
    } else {
      setMaxDate(''); 
    }
  }, [type]);

  return (
    <input
      type={type}
      max={type === 'date' ? maxDate : undefined}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`${className} w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200`}
    />
  );
};

export default Input;
