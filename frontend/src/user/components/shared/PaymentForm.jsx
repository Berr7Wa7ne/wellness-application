import React, { useState } from 'react';
import PayPal from '../../../assets/PayPal.png';

const PaymentForm = ({ onClose }) => {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('creditCard');

  const handlePaymentMethodChange = (event) => {
    setSelectedPaymentMethod(event.target.value);
  };

  return (
    <div className="flex flex-col bg-white p-6 rounded-lg">
      <h2 className="text-2xl font-bold mb-6 text-center">Complete Your Purchase</h2>

      <div className={`p-4 rounded-t-lg transition-colors duration-200 ${selectedPaymentMethod === 'creditCard' ? 'bg-gray-100' : 'bg-white'} hover:bg-gray-100`}>
        <label className="inline-flex items-center cursor-pointer w-full">
          <input 
            type="radio" 
            name="paymentMethod" 
            value="creditCard" 
            className="" 
            checked={selectedPaymentMethod === 'creditCard'}
            onChange={handlePaymentMethodChange}
            // style={{ accentColor: '#f1bf60' }}
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
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">First name</label>
                <input type="text" id="firstName" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
              </div>
              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">Last name</label>
                <input type="text" id="lastName" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
              </div>
            </div>

            <div className="mb-4">
              <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700">Card number</label>
              <div className="relative">
                <input type="text" id="cardNumber" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 pr-10" />
                <span className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 12a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                  </svg>
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label htmlFor="mmYy" className="block text-sm font-medium text-gray-700">MM / YY</label>
                <input type="text" id="mmYy" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" placeholder="MM / YY" />
              </div>
              <div>
                <label htmlFor="cvv" className="block text-sm font-medium text-gray-700">CVV</label>
                <div className="relative">
                  <input type="text" id="cvv" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 pr-10" />
                  <span className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                  </span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="col-span-2">
                <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                    </svg>
                  </span>
                  <input type="text" id="address" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 pl-10" />
                </div>
                <button className="text-[#f1bf60] text-sm mt-2">Add line</button>
              </div>
              <div>
                <label htmlFor="postalCode" className="block text-sm font-medium text-gray-700">Postal code</label>
                <input type="text" id="postalCode" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
              </div>
              <div>
                <label htmlFor="countryRegion" className="block text-sm font-medium text-gray-700">Country/region</label>
                <select id="countryRegion" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2">
                  <option>Nigeria</option>
                  {/* Add more options as needed */}
                </select>
              </div>
            </div>
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
              // style={{ accentColor: '#f1bf60' }}
            />
            <span className="ml-2 text-lg font-medium">PayPal</span>
          </label>
          <img src="https://cdn.shopify.com/shopifycloud/admin-ui-foundations/payment-icons/f427a.svg" alt="PayPal" className="h-8" />
        </div>
        {selectedPaymentMethod === 'paypal' && (
          <div className="mt-4">
            <p className="text-gray-700 mb-4">Connect your PayPal account and use it to pay your bills. You'll be redirected to PayPal to add your billing information.</p>
            <button className="border border-gray-400 flex items-center justify-center py-3 px-6 rounded-md font-semibold text-sm transition-colors hover:bg-gray-100">
              Pay with
              <img src={PayPal} alt="PayPal" className="h w-14 mr-2" />
            </button>
          </div>
        )}
      </div>

      <button className="w-full bg-[#213721] text-white py-3 rounded-md font-semibold text-lg hover:bg-green-800 transition-colors">
        Complete Purchase
      </button>
      <p className="text-center text-sm text-gray-600 mt-2">Plus applicable taxes</p>

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