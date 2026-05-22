import { useEffect } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";

function Modal({
  isOpen,
  title,
  children,
  onClose,
}) {
  useEffect(() => {
    if (!isOpen) {
      return;
    }

    function handleEscape(event) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    document.addEventListener("keydown", handleEscape);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener(
        "keydown",
        handleEscape
      );
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  return createPortal(
    <div
      className="modal-overlay"
      role="presentation"
      onClick={onClose}
    >
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-label={title}
        onClick={(event) =>
          event.stopPropagation()
        }
      >
        <div className="modal-header">
          <h3>{title}</h3>
          <button
            className="icon-btn"
            type="button"
            onClick={onClose}
            aria-label="Close modal"
          >
            <X size={18} />
          </button>
        </div>
        {children}
      </div>
    </div>,
    document.body
  );
}

export default Modal;
