// src/user/components/shared/StripeCheckout.jsx
import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const CheckoutForm = ({ amount }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // 1. Create PaymentIntent on backend
      const res = await fetch('/public/create-payment-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount }),
      });
      
      if (!res.ok) {
        throw new Error('Failed to create payment intent');
      }
      
      const { clientSecret } = await res.json();

      // 2. Confirm card payment
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });

      setLoading(false);
      if (result.error) {
        setError(result.error.message);
      } else if (result.paymentIntent.status === 'succeeded') {
        alert('Payment successful!');
      }
    } catch (err) {
      setLoading(false);
      setError(err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <CardElement 
          options={{
            style: {
              base: {
                fontSize: '16px',
                color: '#424770',
                '::placeholder': {
                  color: '#aab7c4',
                },
              },
              invalid: {
                color: '#9e2146',
              },
            },
          }}
        />
      </div>
      <button 
        type="submit" 
        disabled={!stripe || loading} 
        className="w-full bg-[#213721] text-white py-3 rounded-md font-semibold text-lg hover:bg-green-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? 'Processing...' : `Pay $${amount}`}
      </button>
      {error && <div className="text-red-600 mt-2 text-sm">{error}</div>}
    </form>
  );
};

const StripeCheckout = ({ amount }) => (
  <Elements stripe={stripePromise}>
    <CheckoutForm amount={amount} />
  </Elements>
);

export default StripeCheckout;