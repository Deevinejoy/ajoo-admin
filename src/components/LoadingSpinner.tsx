import React from 'react';

const LoadingSpinner: React.FC<{ size?: number; className?: string }> = ({ size = 40, className = '' }) => {
  return (
    <div className={`flex justify-center items-center ${className}`}>
      <div 
        style={{ width: size, height: size }} 
        className="animate-spin rounded-full border-4 border-solid border-t-[#E5B93E] border-r-transparent border-b-transparent border-l-transparent"
      ></div>
    </div>
  );
};

export default LoadingSpinner; 