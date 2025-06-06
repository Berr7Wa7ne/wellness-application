import React from 'react';

const AdminModal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-opacity-50 flex justify-center items-center z-50 p-4 ml-64 backdrop:filter backdrop-blur-[1px]">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6 overflow-y-auto max-h-[90vh] modal-content-hide-scrollbar">
        {/* We will render children (the form) here. A close button can be added inside the child component if needed. */}
        {children}
      </div>
    </div>
  );
};

export default AdminModal; 