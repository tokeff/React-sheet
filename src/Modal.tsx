import styles from "./modal.module.css";
import React from "react";

interface ModalProps {
  onButtonClick: (confirm: boolean) => void;
  onClose: (show: boolean) => void;
}

const Modal: React.FC<ModalProps> = ({ onButtonClick, onClose }) => {
  return (
    <div className={styles.window}>
      <h1>The column or row you are trying to remove has content in it.</h1>
      <h1>Are you sure?</h1>
      <div className={styles.buttons}>
        <button onClick={() => onClose(false)}>Cancel</button>
        <button
          onClick={() => {
            onButtonClick(true);
            onClose(false);
          }}
        >
          Confirm
        </button>
      </div>
    </div>
  );
};

export default Modal;
