import React from 'react';

const PaymentModal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center px-2 sm:px-4 overflow-y-auto">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl p-4 sm:p-6 mt-10 mb-10 max-h-[90vh] overflow-y-auto">
        {children}
      </div>
    </div>
  );
};

export default PaymentModal;
