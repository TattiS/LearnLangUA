import css from "./Modal.module.css";
import { useEffect } from "react";

const Modal = ({ children, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose?.();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  const handleBackdropClick = (event) => {
    if (event.target === event.currentTarget) {
      onClose?.();
    }
  };
  return (
    <div className={css.modalBackdrop} onClick={handleBackdropClick}>
      <div className={css.modal} role="dialog" aria-modal="true">
        <button className={css.closeBtn} onClick={onClose} aria-label="Close">
          <svg width="32" height="32">
            <use href="/sprite.svg#icon-close" />
          </svg>
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
