export const MapInfoExpansion = ({ isOpen, onClose, children }) => {
  if (!isOpen) {
    return null; // Don't render anything if the popup is not open
  }

  return (
    <div className="popup-overlay" onClick={onClose}> {/* Close when clicking the backdrop */}
      <div className="popup-content" onClick={(e) => e.stopPropagation()}> {/* Prevent clicks inside the popup from closing it */}
        <button className="close-btn" onClick={onClose}>
          &times; {/* A simple 'x' character for a close button */}
        </button>
        {children} {/* Render whatever content is passed inside the Popup tags */}
      </div>
    </div>
  );
};