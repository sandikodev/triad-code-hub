
import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export const Logo: React.FC<LogoProps> = ({ className = '', size = 'md' }) => {
  const sizeMap = {
    sm: 'w-6 h-6',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16'
  };

  return (
    <div className={`relative ${sizeMap[size]} ${className}`}>
      <svg 
        viewBox="0 0 100 100" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-lg"
      >
        <rect width="100" height="100" rx="25" fill="#6366f1" />
        <path 
          d="M50 25L75 70H25L50 25Z" 
          fill="white" 
          className="transition-all duration-500 group-hover:translate-y-[-2px]"
        />
        <circle 
          cx="50" 
          cy="48" 
          r="6" 
          fill="#6366f1" 
          className="animate-pulse"
        />
      </svg>
      <div className="absolute -inset-1 bg-indigo-500/20 blur-md rounded-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
    </div>
  );
};
