import React from "react";

import "./ErrorMessage.scss";

const ErrorMessage = (props) => {
  return <div className="ErrorMessage">{props.children}</div>;
};

export default ErrorMessage;