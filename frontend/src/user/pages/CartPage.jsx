import React, { useState } from 'react';
import Navbar from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { Newsletter } from '../components/shared/Newsletter';
import { CartItemsTable } from '../components/cart/CartItemsTable';
import { CartActions } from '../components/cart/CartActions';
import { ShippingTaxEstimator } from '../components/cart/ShippingTaxEstimator';
import { DiscountSection } from '../components/cart/DiscountSection';
import { OrderSummary } from '../components/cart/OrderSummary';
import { ProceedToCheckoutButton } from '../components/cart/ProceedToCheckoutButton';
import PaymentModal from '../components/shared/PaymentModal';
import PaymentForm from '../components/shared/PaymentForm';

const CartPage = ({ cartItems }) => {
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

  const subtotal = cartItems.reduce((acc, item) => {
    const price = parseFloat(item.price.toString().replace(/[^0-9.]/g, ''));
    return acc + price * item.quantity;
  }, 0);
  const shipping = 0; // For now, assuming store pickup for 0
  const orderTotal = subtotal + shipping;

  const handleOpenPaymentModal = () => {
    setIsPaymentModalOpen(true);
  };

  const handleClosePaymentModal = () => {
    setIsPaymentModalOpen(false);
  };

  return (
    <div>
      <Navbar />
      <div className="container mx-auto px-4 py-28">
        <h1 className="text-3xl font-bold text-[#213721] mb-8">Shopping Cart</h1>
        
        <CartItemsTable items={cartItems} />
        <CartActions />

        <div className="flex flex-col md:flex-row justify-between mt-8 gap-8">
          <div className="md:w-1/2">
            <ShippingTaxEstimator />
            <DiscountSection />
          </div>
          <div className="md:w-1/2 flex flex-col items-end">
            <OrderSummary subtotal={subtotal} shipping={shipping} orderTotal={orderTotal} />
            <ProceedToCheckoutButton onClick={handleOpenPaymentModal} />
          </div>
        </div>

      </div>
      <Newsletter />
      <Footer />

      <PaymentModal isOpen={isPaymentModalOpen} onClose={handleClosePaymentModal}>
        <PaymentForm onClose={handleClosePaymentModal} />
      </PaymentModal>
    </div>
  );
};

export default CartPage; 