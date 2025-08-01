
interface TextProps {
    variant?: string;
    children: React.ReactNode;
    className?: string;
}

const Text: React.FC<TextProps> = ({ variant = "p", children, className = "" }) => {
    const baseStyles = "text-gray-800";

    const variants = {
        h1: "text-4xl font-bold",
        h2: "text-3xl font-semibold",
        h3: "text-2xl font-medium",
        h4: "text-2xl font-medium",
        h5: "text-xl font-medium",
        h6: "text-lg font-medium",
        p: "text-sm",
        small: "text-sm text-gray-600 dark:text-gray-400",
    };

    const Tag = variant;

    return <Tag className={`${baseStyles} ${variants[variant]} ${className}`}>{children}</Tag>;
};

export default Text;
