import css from "./Modal.module.css";
import { useEffect, useRef } from "react";

const Modal = ({ children, onClose }) => {
  const closeBtnRef = useRef(null);
  useEffect(() => {
    closeBtnRef.current?.focus();

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose?.();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
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
        <button
          ref={closeBtnRef}
          className={css.closeBtn}
          onClick={onClose}
          aria-label="Close"
        >
          <svg width="24" height="24">
            <use href="/sprite.svg#icon-close" />
          </svg>
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
