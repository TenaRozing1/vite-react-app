import React from 'react';
import './Button.scss';

interface ButtonProps {
  onClick: () => void;
  color: 'primary' | 'secondary';
  disabled?: boolean;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ onClick, color, disabled = false, children }) => {
  return (
    <button
      className={`btn btn--${color} ${disabled ? 'btn--disabled' : ''}`}
      onClick={!disabled ? onClick : undefined}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
