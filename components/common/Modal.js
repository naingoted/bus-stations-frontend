import React from "react";

const Modal = React.memo((props) => {
  return (
    <React.Fragment>
      <div className="backdrop" onClick={props.onClose} />
      <div className="modal">
        {props.children}
        <div className="modal__actions">
          <button type="button" className="btn" onClick={props.onClose}>
            Okay
          </button>
        </div>
      </div>
    </React.Fragment>
  );
});

export default Modal;
