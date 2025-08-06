import React, { useState } from 'react';
import { useCart } from '../../../context/user/cart/CartContext';
import PaymentModal from '../shared/PaymentModal';
import PaymentForm from '../shared/PaymentForm';

export const ProceedToCheckoutButton = ({ 
  onClick,
  orderTotal,
  currency = 'USD',
  shippingInfo = { cost: 0, method: 'pickup' }
}) => {
  const { cartItems, loading, total } = useCart();
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

  // Use orderTotal if provided, otherwise fall back to cart total
  const finalTotal = orderTotal !== undefined ? orderTotal : total;

  // Format currency display
  const formatCurrency = (amount, currencyCode) => {
    if (currencyCode === 'NGN') {
      return `₦${amount.toLocaleString('en-US')}`;
    }
    return `${currencyCode} ${amount.toLocaleString('en-US', { 
      minimumFractionDigits: 2, 
      maximumFractionDigits: 2 
    })}`;
  };

  const handleOpenPaymentModal = () => {
    if (cartItems.length === 0) {
      alert('Your cart is empty. Please add items before proceeding to checkout.');
      return;
    }
    
    // Call the onClick prop if provided
    if (onClick) {
      onClick();
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
        {loading 
          ? 'Processing...' 
          : cartItems.length === 0 
            ? 'Cart is Empty'
            : `Proceed To Checkout • ${formatCurrency(finalTotal, currency)}`
        }
      </button>

      <PaymentModal isOpen={isPaymentModalOpen} onClose={handleClosePaymentModal}>
        <PaymentForm 
          onClose={handleClosePaymentModal} 
          amount={finalTotal}
          currency={currency}
          shippingInfo={shippingInfo}
        />
      </PaymentModal>
    </>
  );
};