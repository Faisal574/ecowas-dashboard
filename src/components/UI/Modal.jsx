import { createPortal } from "react-dom";

// Overlay
const ModelOverlay = ({ children }) => {
  return (
    <div className="fixed inset-0 z-50">
      <div className="modal modal-open">{children}</div>
    </div>
  );
};

// portal Element
const portalElement = document.getElementById("my-modal");

const Modal = ({ children }) => {
  return (
    <>{createPortal(<ModelOverlay>{children}</ModelOverlay>, portalElement)}</>
  );
};

export default Modal;
