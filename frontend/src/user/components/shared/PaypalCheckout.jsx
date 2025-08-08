// src/components/PaypalCheckout.js
import React from 'react';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

const PaypalCheckout = ({ 
  amount = 10.00, 
  currency = 'USD',
  shippingInfo = { cost: 0, method: 'pickup' },
  onPaymentSuccess
}) => {
  // CRITICAL: Fix decimal precision issues that cause PayPal errors
  const fixedAmount = parseFloat(Number(amount).toFixed(2));
  
  // PayPal supported currencies (PayPal doesn't support NGN directly)
  const paypalCurrency = currency === 'NGN' ? 'USD' : currency;
  
  // Convert NGN to USD if needed (you might want to use a real exchange rate API)
  const paypalAmount = currency === 'NGN' 
    ? parseFloat((fixedAmount / 1600).toFixed(2)) // Rough conversion rate
    : fixedAmount;

  console.log('PayPal Payment Details:', {
    originalAmount: amount,
    fixedAmount: fixedAmount,
    paypalAmount: paypalAmount,
    currency: currency,
    paypalCurrency: paypalCurrency
  });

  return (
    <PayPalScriptProvider 
      options={{ 
        "client-id": import.meta.env.VITE_PAYPAL_CLIENT_ID,
        currency: paypalCurrency
      }}
    >
      <PayPalButtons
        style={{ layout: "vertical" }}
        createOrder={(data, actions) => {
          return actions.order.create({
            purchase_units: [{
              amount: {
                value: paypalAmount.toString(), // Must be string with max 2 decimal places
                currency_code: paypalCurrency
              },
              description: `Order payment${shippingInfo.method !== 'pickup' ? ' (including shipping)' : ''}`,
            }],
          });
        }}
        onApprove={(data, actions) => {
          return actions.order.capture().then((details) => {
            console.log('PayPal payment successful:', details);
            
            // Call the success callback instead of showing alert
            if (onPaymentSuccess) {
              onPaymentSuccess();
            } else {
              alert(`Transaction completed by ${details.payer.name.given_name}!`);
            }
            
            // Here you can call your backend to save the transaction
            // Example:
            // savePayPalTransaction({
            //   orderId: details.id,
            //   payerId: details.payer.payer_id,
            //   amount: paypalAmount,
            //   currency: paypalCurrency,
            //   originalAmount: fixedAmount,
            //   originalCurrency: currency,
            //   shippingInfo: shippingInfo
            // });
          });
        }}
        onError={(err) => {
          console.error('PayPal payment error:', err);
          alert('Payment failed. Please try again or use a different payment method.');
        }}
        onCancel={(data) => {
          console.log('PayPal payment cancelled:', data);
          alert('Payment was cancelled.');
        }}
      />
      
      {currency === 'NGN' && (
        <div className="mt-2">
          <p className="text-xs text-gray-600">
            * Amount converted to USD for PayPal processing: ${paypalAmount}
          </p>
          <p className="text-xs text-gray-500">
            Exchange rate is approximate and may vary
          </p>
        </div>
      )}
    </PayPalScriptProvider>
  );
};

export default PaypalCheckout;