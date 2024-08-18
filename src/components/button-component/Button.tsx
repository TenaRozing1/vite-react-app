import React from 'react';
import './Button.scss';

interface ButtonProps {
  onClick: () => void;
  color: 'primary' | 'secondary';
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ onClick, color, children }) => {
  return (
    <button 
      className={`btn btn--${color}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
