import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../../context/user/cart/CartContext';

export const CartActions = () => {
  const navigate = useNavigate();
  const { clearCart, isUpdating, refreshCart } = useCart();

  const handleContinueShopping = () => {
    navigate('/merchandise');
  };

  const handleClearCart = async () => {
    if (window.confirm('Are you sure you want to clear your shopping cart?')) {
      try {
        await clearCart();
      } catch (error) {
        console.error('Failed to clear cart:', error);
      }
    }
  };

  const handleUpdateCart = async () => {
    // Refresh cart data without affecting the loading state
    try {
      await refreshCart();
    } catch (error) {
      console.error('Failed to update cart:', error);
    }
  };

  return (
    <div className="flex flex-col sm:flex-row justify-between items-center mt-8 space-y-4 sm:space-y-0">
      <button
        className="bg-[#617C5F] text-white py-3 px-6 rounded-none hover:bg-[#8da78d] transition-colors duration-300 transform hover:scale-[1.02] w-full sm:w-auto disabled:opacity-50 disabled:cursor-not-allowed"
        onClick={handleContinueShopping}
        disabled={isUpdating}
      >
        Continue Shopping
      </button>
      <div className="flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0">
        <button
          className="bg-red-700 text-white py-3 px-6 rounded-none hover:bg-red-800 transition-colors duration-300 transform hover:scale-[1.02] w-full sm:w-auto disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={handleClearCart}
          disabled={isUpdating}
        >
          {isUpdating ? 'Clearing...' : 'Clear Shopping Cart'}
        </button>
        <button
          className="bg-[#213721] text-white py-3 px-6 rounded-none hover:bg-green-800 transition-colors duration-300 transform hover:scale-[1.02] w-full sm:w-auto disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={handleUpdateCart}
          disabled={isUpdating}
        >
          {isUpdating ? 'Updating...' : 'Update Shopping Cart'}
        </button>
      </div>
    </div>
  );
}; 