import React from 'react';

interface CTAButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  onClick?: () => void;
}

export default function CTAButton({ 
  children, 
  variant = 'primary', 
  size = 'md',
  className = '',
  onClick 
}: CTAButtonProps) {
  const sizeMap = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  const variantMap = {
    primary: 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5',
    secondary: 'bg-white text-indigo-600 border-2 border-indigo-600 hover:bg-indigo-50 hover:shadow-md',
  };

  return (
    <button
      onClick={onClick}
      className={`
        ${sizeMap[size]}
        ${variantMap[variant]}
        rounded-xl font-bold
        transition-all duration-300
        inline-flex items-center justify-center gap-2
        focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2
        ${className}
      `}
    >
      {children}
    </button>
  );
}
