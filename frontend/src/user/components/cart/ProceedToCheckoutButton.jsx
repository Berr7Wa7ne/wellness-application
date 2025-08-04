import React from 'react';
import { useCart } from '../../../context/user/cart/CartContext';

export const ProceedToCheckoutButton = ({ onClick }) => {
  const { cartItems, loading, checkout } = useCart();

  const handleCheckout = async () => {
    if (cartItems.length === 0) {
      alert('Your cart is empty. Please add items before proceeding to checkout.');
      return;
    }

    try {
      await checkout();
      if (onClick) {
        onClick();
      }
    } catch (error) {
      console.error('Checkout failed:', error);
      alert('Checkout failed. Please try again.');
    }
  };

  return (
    <button
      className="bg-[#213721] text-white py-3 px-8 rounded-none hover:bg-green-800 transition-colors duration-300 transform hover:scale-[1.02] w-full md:w-auto disabled:opacity-50 disabled:cursor-not-allowed"
      onClick={handleCheckout}
      disabled={loading || cartItems.length === 0}
    >
      {loading ? 'Processing...' : 'Proceed To Checkout'}
    </button>
  );
}; 