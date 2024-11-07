import { SvgProps } from '@/interfaces/interfaces';
import { FC } from 'react';

const X: FC<SvgProps> = () => {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M24 8L8 24"
        stroke="#191A15"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8 8L24 24"
        stroke="#191A15"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default X;
