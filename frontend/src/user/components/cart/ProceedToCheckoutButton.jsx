import React, { useState } from 'react';
import { useCart } from '../../../context/user/cart/CartContext';
import PaymentModal from '../shared/PaymentModal';
import PaymentForm from '../shared/PaymentForm';

export const ProceedToCheckoutButton = ({ onClick }) => {
  const { cartItems, loading, total } = useCart();
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

  const handleOpenPaymentModal = () => {
    if (cartItems.length === 0) {
      alert('Your cart is empty. Please add items before proceeding to checkout.');
      return;
    }
    setIsPaymentModalOpen(true);
  };

  const handleClosePaymentModal = () => {
    setIsPaymentModalOpen(false);
  };

  return (
    <>
      <button
        className="bg-[#213721] text-white py-3 px-8 rounded-none hover:bg-green-800 transition-colors duration-300 transform hover:scale-[1.02] w-full md:w-auto disabled:opacity-50 disabled:cursor-not-allowed"
        onClick={handleOpenPaymentModal}
        disabled={loading || cartItems.length === 0}
      >
        {loading ? 'Processing...' : 'Proceed To Checkout'}
      </button>

      <PaymentModal isOpen={isPaymentModalOpen} onClose={handleClosePaymentModal}>
        <PaymentForm onClose={handleClosePaymentModal} amount={total} />
      </PaymentModal>
    </>
  );
}; 