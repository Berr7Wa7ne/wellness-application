import React from 'react';

export const OrderSummary = ({ subtotal, shipping, orderTotal }) => {
  return (
    <div className="w-full border border-gray-200 p-6 mb-8">
      <h3 className="text-xl font-bold text-[#213721] mb-4">Order Summary</h3>
      <div className="space-y-3">
        <div className="flex justify-between text-gray-700">
          <span>Subtotal</span>
          <span>USD {subtotal.toLocaleString('en-US')}</span>
        </div>
        <div className="flex justify-between text-gray-700">
          <span>Shipping (Store/PickUp)</span>
          <span>USD {shipping.toLocaleString('en-US')}</span>
        </div>
        <div className="flex justify-between font-bold text-lg text-[#213721] pt-4 border-t border-gray-200">
          <span>ORDER TOTAL</span>
          <span>USD {orderTotal.toLocaleString('en-US')}</span>
        </div>
      </div>
    </div>
  );
}; 