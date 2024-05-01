import React from "react";
import { IIconsProps } from "../../Interface/Icons.types";

const Close = ({
  width = "14px",
  height = "14px",
  fillColor = "none",
  strokeColor = "none",
}: IIconsProps) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 32 32"
      fill={fillColor}
      stroke={strokeColor}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M24 8L8 24"
        stroke="#191A15"
        stroke-width="2.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M8 8L24 24"
        stroke="#191A15"
        stroke-width="2.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};

export default Close;
