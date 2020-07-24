import React from "react";

import "./ProfitabilityCircle.scss";

const ProfitabilityCircle = (props) => {
  const radius = 80; //precnik
  const stroke = 8;
  const normalizedRadius = radius - stroke * 2; //normalizovani precnik bez debljine ivica
  const circumference = normalizedRadius * 2 * Math.PI; //obim kruga
  const strokeDashoffset = circumference - ((props.percent > 0 ? props.percent : 0)/ 100) * circumference;

  return (
    <svg height={radius * 2} width={radius * 2}>
      <circle
        stroke={props.colorOne}
        fill="transparent"
        strokeWidth={stroke}
        r={normalizedRadius}
        cx={radius}
        cy={radius}
      />
      <circle
        stroke={props.colorTwo}
        fill="transparent"
        strokeDasharray={`${circumference} ${circumference}`}
        strokeDashoffset={strokeDashoffset}
        strokeWidth={stroke}
        strokeLinecap="round"
        r={normalizedRadius}
        cx={radius}
        cy={radius}
        transform={`rotate(-90 ${radius} ${radius})`}
      />
      <text
        className="Highlight_Text"
        x="50%"
        y="50%"
        dominantBaseline="middle"
        textAnchor="middle"
        fill="#FFFFFF"
        opacity={0.7}
      >
        {props.percent > 0 ? `${props.percent.toFixed(2)}%` : `n.a.`}
      </text>
    </svg>
  );
};

export default ProfitabilityCircle;
