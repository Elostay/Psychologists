import React from "react";
import { IIconsProps } from "../../Interface/Icons.types";

const EyeOpen = ({
  width = "14px",
  height = "14px",
  fillColor = "none",
  strokeColor = "none",
}: IIconsProps) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 20 20"
      fill={fillColor}
      stroke={strokeColor}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0.833496 10C0.833496 10 4.16683 3.33334 10.0002 3.33334C15.8335 3.33334 19.1668 10 19.1668 10C19.1668 10 15.8335 16.6667 10.0002 16.6667C4.16683 16.6667 0.833496 10 0.833496 10Z"
        stroke="#191A15"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10 12.5C11.3807 12.5 12.5 11.3807 12.5 10C12.5 8.61929 11.3807 7.5 10 7.5C8.61929 7.5 7.5 8.61929 7.5 10C7.5 11.3807 8.61929 12.5 10 12.5Z"
        stroke="#191A15"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default EyeOpen;
