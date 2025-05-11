import React from "react";

interface LabelProps {
    text: string;
    className?: string;
}

const Label: React.FC<LabelProps> = ({ text, className }) => {
    return <span className={`text-xs ${className}`}>{text}</span>;
};

export default Label;
