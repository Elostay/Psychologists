import React from "react";
import { IIconsProps } from "../../Interface/Icons.types";

const Check = ({
  width = "14px",
  height = "14px",
  fillColor = "none",
  strokeColor = "none",
}: IIconsProps) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 16 17"
      fill={fillColor}
      stroke={strokeColor}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M2.5 5.5L0 8L7.5 15.5L20 3L17.5 0.5L7.5 10.5L2.5 5.5Z"
        fill="#3470FF"
      />
    </svg>
  );
};

export default Check;
