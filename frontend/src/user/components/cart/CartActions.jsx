import React from 'react';
import { useNavigate } from 'react-router-dom';

export const CartActions = () => {
  const navigate = useNavigate();

  const handleContinueShopping = () => {
    navigate('/merchandise');
  };

  return (
    <div className="flex flex-col sm:flex-row justify-between items-center mt-8 space-y-4 sm:space-y-0">
      <button
        className="bg-[#617C5F] text-white py-3 px-6 rounded-none hover:bg-[#8da78d] transition-colors duration-300 transform hover:scale-[1.02] w-full sm:w-auto"
        onClick={handleContinueShopping}
      >
        Continue Shopping
      </button>
      <div className="flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0">
        <button
          className="bg-red-700 text-white py-3 px-6 rounded-none hover:bg-red-800 transition-colors duration-300 transform hover:scale-[1.02] w-full sm:w-auto"
        >
          Clear Shopping Cart
        </button>
        <button
          className="bg-[#213721] text-white py-3 px-6 rounded-none hover:bg-green-800 transition-colors duration-300 transform hover:scale-[1.02] w-full sm:w-auto"
        >
          Update Shopping Cart
        </button>
      </div>
    </div>
  );
}; 