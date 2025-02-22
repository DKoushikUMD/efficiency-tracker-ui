import React from 'react';

export const Alert = ({ children, variant = 'default', className = '', ...props }) => {
  const variants = {
    default: 'bg-gray-100 text-gray-900',
    destructive: 'bg-red-50 border border-red-100 text-red-600',
    success: 'bg-green-100 text-green-900',
  };

  return (
    <div className={`rounded-lg p-4 ${variants[variant]} ${className}`} {...props}>
      {children}
    </div>
  );
};

export const AlertTitle = ({ children, className = '', ...props }) => (
  <h5 className={`font-medium mb-1 ${className}`} {...props}>{children}</h5>
);

export const AlertDescription = ({ children, className = '', ...props }) => (
  <div className={`text-sm ${className}`} {...props}>{children}</div>
);

export default Alert;