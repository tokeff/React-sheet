import styles from "./modal.module.css";
import React from "react";
import { useState } from "react";
import { useKeyPressEvent } from "react-use";

interface ModalProps {
  onButtonClick: (confirm: boolean) => void;
  onClose: (show: boolean) => void;
}

const Modal: React.FC<ModalProps> = ({ onButtonClick, onClose }) => {
  const [selectedButton, setSelectedButton] = useState<"cancel" | "confirm">(
    "cancel"
  );

  useKeyPressEvent("ArrowLeft", () => setSelectedButton("cancel"));
  useKeyPressEvent("ArrowRight", () => setSelectedButton("confirm"));
  useKeyPressEvent("Escape", () => {
    onClose(false);
  });
  useKeyPressEvent("Enter", () => {
    if (selectedButton === "cancel") {
      onClose(false);
    } else {
      onButtonClick(true);
      onClose(false);
    }
  });

  return (
    <>
      <div onClick={() => onClose(false)} className={styles.overlay}></div>
      <div className={styles.window}>
        <h1>The column or row you are trying to remove has content in it.</h1>
        <h1>Are you sure?</h1>
        <div className={styles.buttons}>
          <button
            className={selectedButton === "cancel" ? styles.selected : ""}
            onClick={() => onClose(false)}
          >
            Cancel
          </button>
          <button
            className={selectedButton === "confirm" ? styles.selected : ""}
            onClick={() => {
              onButtonClick(true);
              onClose(false);
            }}
          >
            Confirm
          </button>
        </div>
      </div>
    </>
  );
};

export default Modal;
