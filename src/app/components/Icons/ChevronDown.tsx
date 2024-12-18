import { SvgProps } from '@/interfaces/interfaces';
import { FC } from 'react';

const ChevronDown: FC<SvgProps> = () => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M5 12.5L10 7.5L15 12.5"
        stroke="#FBFBFB"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default ChevronDown;
