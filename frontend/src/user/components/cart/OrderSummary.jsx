import React from 'react';

export const OrderSummary = ({ 
  subtotal, 
  shipping = { cost: 0, currency: 'USD', method: 'pickup' }, 
  orderTotal,
  currency = 'USD' 
}) => {
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

  // Get shipping method display name
  const getShippingMethodName = (method) => {
    const methods = {
      'pickup': 'Store Pickup',
      'standard': 'Standard Shipping',
      'express': 'Express Shipping'
    };
    return methods[method] || 'Shipping';
  };

  // Calculate the actual order total (subtotal + shipping)
  const calculatedTotal = subtotal + (shipping.cost || 0);

  return (
    <div className="w-full border border-gray-200 p-6 mb-8 rounded-lg shadow-sm bg-white">
      <h3 className="text-xl font-bold text-[#213721] mb-4">Order Summary</h3>
      <div className="space-y-3">
        <div className="flex justify-between text-gray-700">
          <span>Subtotal</span>
          <span>{formatCurrency(subtotal, currency)}</span>
        </div>
        
        <div className="flex justify-between text-gray-700">
          <span>{getShippingMethodName(shipping.method)}</span>
          <span>
            {shipping.cost === 0 
              ? 'Free' 
              : formatCurrency(shipping.cost, shipping.currency || currency)
            }
          </span>
        </div>
        
        {/* Show tax line if needed (you can add tax calculation later) */}
        {/* <div className="flex justify-between text-gray-700">
          <span>Tax</span>
          <span>{formatCurrency(0, currency)}</span>
        </div> */}
        
        <div className="flex justify-between font-bold text-lg text-[#213721] pt-4 border-t border-gray-200">
          <span>ORDER TOTAL</span>
          <span>{formatCurrency(calculatedTotal, shipping.currency || currency)}</span>
        </div>
        
        {/* Additional shipping info */}
        {shipping.method !== 'pickup' && shipping.cost > 0 && (
          <div className="text-xs text-gray-500 mt-2">
            * Shipping cost may vary based on final destination
          </div>
        )}
      </div>
    </div>
  );
};