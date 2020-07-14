import React from "react";

import "./Icon.scss";

const Icon = (props) => {
  return (
    <i className={`fa fa-${props.icon}`}></i>
  )
};

export default Icon;
