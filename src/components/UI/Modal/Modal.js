import React from "react";
import ReactDOM from "react-dom";

import "./Modal.scss";

const Modal = (props) => {
  return props.show
    ? ReactDOM.createPortal(
        <div onClick={props.onDismiss} className="Modal">
          <div onClick={(e) => e.stopPropagation()} className="ModalWindow">
            <div className="content">{props.content}</div>
            <div className="actions">{props.actions}</div>
          </div>
        </div>,
        document.querySelector("#modal")
      )
    : null;
};

export default Modal;
