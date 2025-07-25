// src/components/atoms/Button.tsx
import React from "react";

type ButtonProps = {
  children: React.ReactNode;
  type?: "button" | "submit" | "reset";
  variant?: "primary" | "secondary" | "danger";
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
};

const Button = ({
  children,
  type = "button",
  variant = "primary",
  className = "",
  onClick,
  disabled = false,
}: ButtonProps) => {
  let variantClass = "";

  switch (variant) {
    case "secondary":
      variantClass = "bg-gray-600 hover:bg-gray-700";
      break;
    case "danger":
      variantClass = "bg-red-600 hover:bg-red-700";
      break;
    case "primary":
    default:
      variantClass = "bg-blue-600 hover:bg-blue-700";
      break;
  }

  const disabledClass = disabled ? "opacity-50 cursor-not-allowed" : "";

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`px-4 py-2 rounded-md text-white font-medium transition-colors duration-200 ${variantClass} ${disabledClass} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
