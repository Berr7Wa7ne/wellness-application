import React from 'react';

export const ProceedToCheckoutButton = ({ onClick }) => {
  return (
    <button
      className="bg-[#213721] text-white py-3 px-8 rounded-none hover:bg-green-800 transition-colors duration-300 transform hover:scale-[1.02] w-full md:w-auto"
      onClick={onClick}
    >
      Proceed To Checkout
    </button>
  );
}; 