import React from 'react';
import { useCart } from '../../context/user/cart/CartContext';
import { CartItemsTable } from '../components/cart/CartItemsTable';
import { CartActions } from '../components/cart/CartActions';
import { OrderSummary } from '../components/cart/OrderSummary';
import { ProceedToCheckoutButton } from '../components/cart/ProceedToCheckoutButton';
import { DiscountSection } from '../components/cart/DiscountSection';
import { ShippingTaxEstimator } from '../components/cart/ShippingTaxEstimator';

const CartPage = () => {
  const { cartItems, total, loading, error, fetchCart, isUpdating } = useCart();

  // Calculate shipping (you can modify this logic based on your requirements)
  const shipping = 0; // Free shipping for now
  const orderTotal = total + shipping;

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#213721]"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-red-600 mb-4">Error Loading Cart</h1>
            <p className="text-gray-600">{error}</p>
            <button 
              onClick={fetchCart}
              className="mt-4 bg-[#213721] text-white px-4 py-2 rounded hover:bg-green-800 transition-colors duration-300"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-36">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#213721]">Shopping Cart</h1>
          <p className="text-gray-600 mt-2">
            {cartItems.length === 0 
              ? 'Your cart is empty' 
              : `${cartItems.length} item${cartItems.length !== 1 ? 's' : ''} in your cart`
            }
          </p>
          {isUpdating && (
            <div className="mt-2 flex items-center text-sm text-[#617C5F]">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-[#617C5F] mr-2"></div>
              Updating cart...
            </div>
          )}
        </div>

        {cartItems.length === 0 ? (
          <div className="text-center py-12">
            <div className="mb-6">
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m6 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Your cart is empty</h3>
            <p className="text-gray-500 mb-6">Looks like you haven't added any items to your cart yet.</p>
            <button
              onClick={() => window.location.href = '/merchandise'}
              className="bg-[#213721] text-white px-6 py-3 rounded hover:bg-green-800 transition-colors duration-300"
            >
              Start Shopping
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Cart Content */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow">
                <div className="p-6">
                  <CartItemsTable items={cartItems} />
                </div>
              </div>
              
              <CartActions />
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <OrderSummary 
                subtotal={total} 
                shipping={shipping} 
                orderTotal={orderTotal} 
              />
              
              <ProceedToCheckoutButton />
              
              <DiscountSection />
              
              <ShippingTaxEstimator />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage; 