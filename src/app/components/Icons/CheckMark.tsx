import { SvgProps } from '@/interfaces/interfaces';
import { FC } from 'react';

const CheckMark: FC<SvgProps> = ({ fill = 'none' }) => {
  return (
    <svg
      width="20"
      height="16"
      viewBox="0 0 20 16"
      fill={fill}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M2.5 5.5L0 8L7.5 15.5L20 3L17.5 0.5L7.5 10.5L2.5 5.5Z"
        fill={fill}
      />
    </svg>
  );
};

export default CheckMark;
