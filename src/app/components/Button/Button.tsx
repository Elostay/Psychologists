import clsx from 'clsx';
import { FC, ReactNode } from 'react';

interface ButtonProps {
  children: ReactNode;
  background?: string;
  type?: 'button' | 'submit' | 'reset';
  onClick?: () => void;
  color?: string;
  border?: boolean;
}

const Button: FC<ButtonProps> = ({
  children,
  background,
  type,
  color,
  border,
}) => {
  return (
    <button
      type={type}
      className={clsx(
        'px-10 py-[14px] font-medium rounded-[30px] ',
        background,
        color,
        border && 'border border-gray-400'
      )}
    >
      {children}
    </button>
  );
};

export default Button;
