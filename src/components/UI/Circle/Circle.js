import React from "react";

import "./Circle.scss";

const Circle = (props) => {
  const radius = 5;

  let checkmarkSvgCircle;
  if (props.valid) {
    switch (props.color) {
      case "#ffa000":
        checkmarkSvgCircle = "SvgCircle_One";
        break;
      case "#46d4b4":
        checkmarkSvgCircle = "SvgCircle_Two";
        break;
      case "#1580de":
        checkmarkSvgCircle = "SvgCircle_Three";
        break;
      default:
        checkmarkSvgCircle = "";
    }
  } else {
    checkmarkSvgCircle = "";
  }

  return (
    <svg height={radius * 2} width={radius * 2}>
      <circle
        className={checkmarkSvgCircle}
        stroke="none"
        fill="rgba(0, 0, 0, 0.2)"
        overflow="hidden"
        r={radius}
        cx={radius}
        cy={radius}
      ></circle>
    </svg>
  );
};

export default Circle;
