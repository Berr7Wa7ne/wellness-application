import React from 'react';

const PaymentModal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="mt-4 fixed inset-0 bg-opacity-50 flex justify-center items-center z-50 p-4 backdrop:filter backdrop-blur-[1px] ">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl p-6 overflow-y-auto max-h-[70vh] modal-content-hide-scrollbar shadow-gray-300">
        {children}
      </div>
    </div>
  );
};

export default PaymentModal; 