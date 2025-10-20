import React from 'react';

type SpinnerLoaderProps = {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  text?: string | null;
  fullScreen?: boolean;
  className?: string;
};

const SpinnerLoader: React.FC<SpinnerLoaderProps> = ({
  size = 'md',
  text = '',
  fullScreen = false,
  className = '',
}) => {
  const sizeClasses: Record<NonNullable<SpinnerLoaderProps['size']>, string> = {
    sm: 'h-4 w-4',
    md: 'h-6 w-6',
    lg: 'h-8 w-8',
    xl: 'h-12 w-12',
  };

  const wrapperClasses = fullScreen
    ? 'fixed inset-0 z-50 flex flex-col items-center justify-center bg-white/70 dark:bg-black/50'
    : 'flex flex-col items-center justify-center py-4';

  return (
    <div className={`${wrapperClasses} ${className}`}>
      <div
        className={`animate-spin rounded-full border-4 border-gray-300 border-t-blue-600 ${sizeClasses[size]}`}
      />
      {text && <span className="mt-2 text-sm text-gray-600 dark:text-gray-300">{text}</span>}
    </div>
  );
};

export default SpinnerLoader;
