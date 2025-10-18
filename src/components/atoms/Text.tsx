
interface TextProps {
    variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'small'; 
    children: React.ReactNode;
    className?: string;
}

const Text: React.FC<TextProps> = ({ variant = "p", children, className = "" }) => {
    const baseStyles = "text-gray-800";

    const variants: Record<string, string> = {
        h1: "text-2xl sm:text-3xl md:text-4xl font-bold",
        h2: "text-xl sm:text-2xl md:text-3xl font-semibold",
        h3: "text-lg sm:text-xl md:text-2xl font-medium",
        h4: "text-base sm:text-lg md:text-xl font-medium",
        h5: "text-base md:text-lg font-medium",
        h6: "text-sm md:text-base font-medium",
        p: "text-sm md:text-base",
        small: "text-xs md:text-sm text-gray-600 dark:text-gray-400",
    };

    const Tag = variant;

    return <Tag className={`${baseStyles} ${variants[variant]} ${className}`}>{children}</Tag>;
};

export default Text;
