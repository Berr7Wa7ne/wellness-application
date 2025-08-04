import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../../context/user/cart/CartContext';

export const AddToCartModal = ({ isOpen, onClose, product }) => {
  const navigate = useNavigate();
  const { addToCart, loading } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Reset state when modal opens - must be called before any conditional returns
  useEffect(() => {
    if (isOpen) {
      setIsSuccess(false);
      setQuantity(1);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleAddToCart = async () => {
    if (!product?._id) {
      alert('Product information is missing');
      return;
    }

    setIsAdding(true);
    try {
      await addToCart(product._id, quantity);
      setIsSuccess(true);
      // Close modal after 2 seconds to show success message
      setTimeout(() => {
        setIsSuccess(false);
        onClose();
      }, 2000);
    } catch (error) {
      console.error('Failed to add to cart:', error);
      
      // Check if it's an authentication error
      if (error.response?.status === 401 || error.message?.includes('log in')) {
        const shouldLogin = window.confirm(
          'You need to be logged in to add items to your cart. Would you like to go to the login page?'
        );
        if (shouldLogin) {
          onClose();
          navigate('/');
        }
      } else {
        alert(error.response?.data?.message || 'Failed to add item to cart');
      }
    } finally {
      setIsAdding(false);
    }
  };

  const handleCheckCart = () => {
    navigate('/cart');
    onClose();
  };

  const handleBackToShopping = () => {
    navigate('/merchandise');
    onClose();
  };

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value) || 1;
    setQuantity(Math.max(1, value));
  };

  return createPortal(
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 backdrop:filter backdrop-blur-[1px]">
      <div className="bg-white p-8 rounded-lg shadow-xl max-w-sm w-full text-center">
        {isSuccess ? (
          <>
            <div className="mb-4">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-green-600 mb-2">Successfully Added!</h2>
              <p className="text-gray-600">{product?.name} has been added to your cart</p>
            </div>
          </>
        ) : (
          <>
            <h2 className="text-2xl font-bold text-[#213721] mb-4">Add to Cart</h2>
            
            {product && (
              <>
                <div className="mb-4">
                  <img 
                    src={product.imageUrl || product.image || '/placeholder-image.jpg'} 
                    alt={product.name} 
                    className="w-24 h-24 object-cover rounded mx-auto mb-2"
                    onError={(e) => {
                      e.target.src = '/placeholder-image.jpg';
                    }}
                  />
                  <p className="text-gray-700 text-lg font-semibold mb-2">{product.name}</p>
                  <p className="text-gray-600 text-xl font-bold mb-4">
                    ${typeof product.price === 'number' ? product.price.toFixed(2) : product.price}
                  </p>
                </div>

                <div className="mb-6">
                  <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-2">
                    Quantity
                  </label>
                  <input
                    type="number"
                    id="quantity"
                    value={quantity}
                    onChange={handleQuantityChange}
                    min="1"
                    max={product.stock || 99}
                    className="w-20 text-center border border-gray-300 rounded py-2 px-3"
                    disabled={isAdding}
                  />
                  {product.stock && (
                    <p className="text-sm text-gray-500 mt-1">
                      {product.stock} available
                    </p>
                  )}
                </div>
              </>
            )}

            <div className="flex flex-col space-y-4">
              <button
                className="bg-[#213721] text-white py-3 px-6 rounded-none hover:bg-green-800 transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={handleAddToCart}
                disabled={isAdding || loading}
              >
                {isAdding ? 'Adding...' : 'Add to Cart'}
              </button>
              <button
                className="bg-[#617C5F] text-white py-3 px-6 rounded-none hover:bg-[#8da78d] transition-all duration-300 transform hover:scale-[1.02]"
                onClick={handleCheckCart}
              >
                View Cart
              </button>
              <button
                className="bg-gray-500 text-white py-3 px-6 rounded-none hover:bg-gray-600 transition-all duration-300 transform hover:scale-[1.02]"
                onClick={handleBackToShopping}
              >
                Back to Shopping
              </button>
            </div>
          </>
        )}
      </div>
    </div>,
    document.body
  );
}; 