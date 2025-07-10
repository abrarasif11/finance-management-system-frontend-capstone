import React, { useState, useEffect } from "react";

const GenericModal = ({ isOpen, onClose, title, children }) => {
  const [isModalOpen, setIsModalOpen] = useState(isOpen || false);

  // Sync with parent-controlled state if isOpen prop is provided
  useEffect(() => {
    setIsModalOpen(isOpen);
  }, [isOpen]);

  // Handle modal close
  const handleClose = () => {
    setIsModalOpen(false);
    if (onClose) onClose();
  };

  // Render nothing if modal is closed
  if (!isModalOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50"
      onClick={handleClose}
    >
      <div
        className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md md:max-w-lg lg:max-w-xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
      >
        {/* Header with Title and Close Button */}
        <div className="flex justify-between items-center border-b pb-3 mb-4">
          <h2 className="text-xl md:text-2xl font-semibold text-gray-800">{title}</h2>
          <button
            className="text-gray-500 hover:text-gray-700 text-2xl font-bold focus:outline-none"
            onClick={handleClose}
            aria-label="Close modal"
          >
            ×
          </button>
        </div>

        {/* Content Area */}
        <div className="text-gray-700 text-base leading-relaxed">{children}</div>

        {/* Close Button */}
        <div className="mt-6 flex justify-end">
          <button
            className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onClick={handleClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default GenericModal;