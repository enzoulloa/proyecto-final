import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

export function Modal({ children, onClose }) {
    return (
      <div className="modal">
        <div className="modal-content">
          <button className="btn" onClick={onClose}>
            ❌
          </button>
          {children}
        </div>
      </div>
    );
  }
  
  export default function ModalPortal({ children, onClose }) {
    return ReactDOM.createPortal(
      <Modal onClose={onClose}>
          {children}
      </Modal>,
      document.getElementById('modal-root')
      );
  }
  