import React from "react";

import "./Button.scss";

const Button = (props) => {
  return (
    <button
      // disabled={props.disabled}
      onClick={props.clicked}
      // className={`Button ${props.btnType}`}
      className="Button"
    >
      {props.children}
    </button>
  );
};

export default Button;
