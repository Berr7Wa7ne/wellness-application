// src/components/PaypalCheckout.js
import React from 'react';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

const PaypalCheckout = ({ amount = 10.00 }) => {
  return (
    <PayPalScriptProvider options={{ "client-id": import.meta.env.VITE_PAYPAL_CLIENT_ID }}>
      <PayPalButtons
        style={{ layout: "vertical" }}
        createOrder={(data, actions) => {
          return actions.order.create({
            purchase_units: [{
              amount: {
                value: amount.toString() // Use the passed amount
              },
            }],
          });
        }}
        onApprove={(data, actions) => {
          return actions.order.capture().then((details) => {
            alert(`Transaction completed by ${details.payer.name.given_name}`);
            // Call your backend here if you need to save the transaction
          });
        }}
      />
    </PayPalScriptProvider>
  );
};

export default PaypalCheckout;
