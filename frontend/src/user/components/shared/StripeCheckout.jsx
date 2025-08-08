// src/user/components/shared/StripeCheckout.jsx
import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const CheckoutForm = ({ amount, currency = 'USD', onPaymentSuccess }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Get your backend URL from environment variables
      const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';
      
      // 1. Create PaymentIntent on backend
      const res = await fetch(`${backendUrl}/public/create-payment-intent`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          // Add authorization header if needed
          // 'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ 
          amount: parseFloat(amount),
          currency: currency.toLowerCase()
        }),
      });
      
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || 'Failed to create payment intent');
      }
      
      const { clientSecret } = await res.json();

      // 2. Confirm card payment
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            // You can add billing details here if needed
            // name: 'Customer Name',
            // email: 'customer@example.com',
          },
        },
      });

      setLoading(false);
      
      if (result.error) {
        setError(result.error.message);
        console.error('Payment failed:', result.error);
      } else if (result.paymentIntent.status === 'succeeded') {
        console.log('Payment successful!', result.paymentIntent);
        
        // Call the success callback instead of showing alert
        if (onPaymentSuccess) {
          onPaymentSuccess();
        } else {
          alert('Payment successful! Your order has been processed.');
        }
      }
    } catch (err) {
      setLoading(false);
      setError(err.message);
      console.error('Payment error:', err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="p-4 border border-gray-300 rounded-md">
        <CardElement 
          options={{
            style: {
              base: {
                fontSize: '16px',
                color: '#424770',
                '::placeholder': {
                  color: '#aab7c4',
                },
                fontFamily: 'system-ui, -apple-system, sans-serif',
              },
              invalid: {
                color: '#9e2146',
              },
            },
            hidePostalCode: false, // Set to true if you don't want postal code
          }}
        />
      </div>
      
      {error && (
        <div className="text-red-600 text-sm p-2 bg-red-50 border border-red-200 rounded">
          {error}
        </div>
      )}
      
      <button 
        type="submit" 
        disabled={!stripe || loading} 
        className="w-full bg-[#213721] text-white py-3 px-4 rounded-md font-semibold text-lg hover:bg-green-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
      >
        {loading ? (
          <>
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
            Processing...
          </>
        ) : (
          `Pay ${currency.toUpperCase()} ${parseFloat(amount).toFixed(2)}`
        )}
      </button>
    </form>
  );
};

const StripeCheckout = ({ amount, currency = 'USD', shippingInfo, onPaymentSuccess }) => (
  <Elements stripe={stripePromise}>
    <CheckoutForm amount={amount} currency={currency} onPaymentSuccess={onPaymentSuccess} />
  </Elements>
);

export default StripeCheckout;