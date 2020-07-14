import React from 'react';
import ReactDOM from 'react-dom';

import "./Modal.scss";


const Modal = props => {
    return ReactDOM.createPortal(
        <div onClick={props.onDismiss} className="Modal">
            <div onClick={e => e.stopPropagation()} className="ModalWindow">
                {/* <div className="header">{props.title}</div> */}
                <div className="content">{props.content}</div>
                <div className="actions">{props.actions}</div>
            </div>
        </div>,
        document.querySelector('#modal')
    )
}

export default Modal;