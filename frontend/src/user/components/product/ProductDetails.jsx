import React, { useState } from 'react';
import { DeliveryDetails } from './DeliveryDetails';
import PaymentModal from '../shared/PaymentModal';
import PaymentForm from '../shared/PaymentForm';

export const ProductDetails = ({ product, handleAddToCart, handleBuyNow }) => {
  console.log('ProductDetails rendered with product:', product);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

  const handleOpenPaymentModal = () => {
    setIsPaymentModalOpen(true);
  };

  const handleClosePaymentModal = () => {
    setIsPaymentModalOpen(false);
  };

  return (
    <div className="md:w-1/2 md:pl-8 mt-10 md:mt-0">
      <h1 className="text-4xl font-bold text-[#213721] mb-4 font-mono">{product.name}</h1>
      <p className="text-2xl text-[#617C5F] mb-6 font-serif font-semibold">{product.price}</p>
      <p className="text-lg text-gray-700 mb-6">{product.description}</p>
      <div className="flex items-center text-lg text-yellow-500 mb-6">
        <span className="mr-2">★ ★ ★ ★ ☆</span> (4.5/5 stars)
      </div>
      <div className="flex space-x-4 mb-8">
        <button
          className="bg-[#213721] text-white py-3 px-6 rounded-none hover:bg-green-800 transition-all duration-300 transform hover:scale-[1.02]"
          onClick={() => {
            console.log('Attempting to add product:', product);
            handleAddToCart(product);
          }}
        >
          Add to Cart
        </button>
        <button
          className="bg-[#617C5F] text-white py-3 px-6 rounded-none hover:bg-[#8da78d] transition-all duration-300 transform hover:scale-[1.02]"
          onClick={handleOpenPaymentModal}
        >
          Buy Now
        </button>
      </div>
      <DeliveryDetails />

      <PaymentModal isOpen={isPaymentModalOpen} onClose={handleClosePaymentModal}>
        <PaymentForm onClose={handleClosePaymentModal} />
      </PaymentModal>
    </div>
  );
}; 