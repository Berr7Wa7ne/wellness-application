import React, { useState } from 'react';
import PayPal from '../../../assets/PayPal.png';
import StripeCheckout from './StripeCheckout';
import PaypalCheckout from './PaypalCheckout';

const PaymentForm = ({ 
  onClose, 
  amount = 10.00, 
  currency = 'USD',
  shippingInfo = { cost: 0, method: 'pickup' }
}) => {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('creditCard');

  // Fix decimal precision issues by rounding to 2 decimal places
  const fixedAmount = parseFloat(Number(amount).toFixed(2));

  const handlePaymentMethodChange = (event) => {
    setSelectedPaymentMethod(event.target.value);
  };

  // Format currency for display
  const formatCurrency = (amount, currencyCode) => {
    if (currencyCode === 'NGN') {
      return `₦${amount.toLocaleString('en-US')}`;
    }
    return `${currencyCode} ${amount.toLocaleString('en-US', { 
      minimumFractionDigits: 2, 
      maximumFractionDigits: 2 
    })}`;
  };

  return (
    <div className="flex flex-col bg-white p-6 rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-center">Complete Your Purchase</h2>
      
      {/* Order Summary */}
      <div className="bg-gray-50 p-4 rounded-lg mb-6">
        <div className="flex justify-between items-center">
          <span className="text-lg font-medium">Total Amount:</span>
          <span className="text-xl font-bold text-[#213721]">
            {formatCurrency(fixedAmount, currency)}
          </span>
        </div>
        {shippingInfo.method !== 'pickup' && shippingInfo.cost > 0 && (
          <p className="text-sm text-gray-600 mt-1">
            Includes {formatCurrency(shippingInfo.cost, currency)} shipping
          </p>
        )}
      </div>

      <div className={`p-4 rounded-t-lg transition-colors duration-200 ${selectedPaymentMethod === 'creditCard' ? 'bg-gray-100' : 'bg-white'} hover:bg-gray-100`}>
        <label className="inline-flex items-center cursor-pointer w-full">
          <input 
            type="radio" 
            name="paymentMethod" 
            value="creditCard" 
            className="" 
            checked={selectedPaymentMethod === 'creditCard'}
            onChange={handlePaymentMethodChange}
          />
          <span className="ml-2 text-lg font-medium">Credit or debit card</span>
          <div className="flex justify-end space-x-2 mt-0 ml-auto">
            <img src="https://cdn.shopify.com/shopifycloud/admin-ui-foundations/payment-icons/2c2bf.svg" alt="Visa" className="h-6" />
            <img src="https://cdn.shopify.com/shopifycloud/admin-ui-foundations/payment-icons/cd169.svg" alt="Mastercard" className="h-6" />
            <img src="https://cdn.shopify.com/shopifycloud/admin-ui-foundations/payment-icons/b34cb.svg" alt="American Express" className="h-6" />
            <img src="https://cdn.shopify.com/shopifycloud/admin-ui-foundations/payment-icons/d50d6.svg" alt="Discover" className="h-6" />
          </div>
        </label>
        {selectedPaymentMethod === 'creditCard' && (
          <div className="mt-4">
            <StripeCheckout 
              amount={fixedAmount} 
              currency={currency}
              shippingInfo={shippingInfo}
            />
          </div>
        )}
      </div>

      <div className={`mb-4 rounded-b-lg p-4 transition-colors duration-200 ${selectedPaymentMethod === 'paypal' ? 'bg-gray-100' : 'bg-white'} hover:bg-gray-100`}>
        <div className='flex justify-between items-center'>
          <label className="inline-flex items-center cursor-pointer">
            <input 
              type="radio" 
              name="paymentMethod" 
              value="paypal" 
              className="" 
              checked={selectedPaymentMethod === 'paypal'}
              onChange={handlePaymentMethodChange}
            />
            <span className="ml-2 text-lg font-medium">PayPal</span>
          </label>
          <img src="https://cdn.shopify.com/shopifycloud/admin-ui-foundations/payment-icons/f427a.svg" alt="PayPal" className="h-8" />
        </div>
        {selectedPaymentMethod === 'paypal' && (
          <div className="mt-4">
            <p className="text-gray-700 mb-4">Connect your PayPal account and use it to pay your bills. You'll be redirected to PayPal to add your billing information.</p>
            <PaypalCheckout 
              amount={fixedAmount} 
              currency={currency}
              shippingInfo={shippingInfo}
            />
          </div>
        )}
      </div>

      <div className="flex justify-between mt-6">
        <button onClick={onClose} className="text-[#f1bf60] flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
          </svg>
          Back to shopping
        </button>
        <button onClick={onClose} className="text-[#f1bf60] flex items-center">
          Cancel
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default PaymentForm;