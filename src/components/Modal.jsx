/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-key */
import React, { useEffect } from "react";
import "./modal.css";

function Modal({ show, onClose, data }) {
  if (!show) return null;

  const closeWithESC = (e) => {
    if ((e.charCode || e.keyCode) === 27) onClose();
  };

  useEffect(() => {
    document.body.addEventListener("keydown", closeWithESC);
    return () => document.body.removeEventListener("keydown", closeWithESC);
  }, []);

  return (
      <div className="modal">
          <div className="modal-container">
              <div className="modal-header">
                  <h4> {data.title} </h4>
              </div>
              <div className="modal-body">
                  {data.body}
              </div>
              <div className="modal-footer">
                  <button onClick={onClose}>ok</button>
              </div>
          </div>
      </div>
  );
}

export default Modal;
