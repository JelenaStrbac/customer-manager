import React from "react";
import classNames from "classnames";

import "./Backdrop.scss";

const Backdrop = (props) => {
  console.log(props);
  return (
    <div
      className={classNames("Backdrop", {
        OpenBackdrop: props.open,
        CloseBackdrop: !props.open,
      })}
      onClick={props.toolbarClosedHandler}
    ></div>
  );
};

export default Backdrop;
