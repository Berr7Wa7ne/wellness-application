import React from 'react';
import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router-dom';

export const AddToCartModal = ({ isOpen, onClose, productName, productPrice }) => {
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleCheckCart = () => {
    navigate('/cart'); // Assuming a cart page exists or will be created
    onClose();
  };

  const handleBackToShopping = () => {
    navigate('/merchandise'); // Navigate back to the merchandise page
    onClose();
  };

  return createPortal(
    <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50 backdrop:filter backdrop-blur-[1px]">
      <div className="bg-white p-8 rounded-lg shadow-xl max-w-sm w-full text-center">
        <h2 className="text-2xl font-bold text-[#213721] mb-4">Successfully Added to Cart!</h2>
        <p className="text-gray-700 text-lg font-semibold mb-2">{productName}</p>
        <p className="text-gray-600 text-xl font-bold mb-6">{productPrice}</p>
        <div className="flex flex-col space-y-4">
          <button
            className="bg-[#213721] text-white py-3 px-6 rounded-none hover:bg-green-800 transition-all duration-300 transform hover:scale-[1.02]"
            onClick={handleCheckCart}
          >
            View Cart
          </button>
          <button
            className="bg-[#617C5F] text-white py-3 px-6 rounded-none hover:bg-[#8da78d] transition-all duration-300 transform hover:scale-[1.02]"
            onClick={handleBackToShopping}
          >
            Back to Shopping
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}; 