import React, { useState, useEffect } from 'react';
import { ShoppingCart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../../context/user/cart/CartContext';

export const CartIcon = () => {
  const navigate = useNavigate();
  const { cartItems } = useCart();
  const [isAnimating, setIsAnimating] = useState(false);

  const itemCount = cartItems.length;

  // Animate when cart items change
  useEffect(() => {
    if (itemCount > 0) {
      setIsAnimating(true);
      const timer = setTimeout(() => setIsAnimating(false), 300);
      return () => clearTimeout(timer);
    }
  }, [itemCount]);

  const handleCartClick = () => {
    navigate('/cart');
  };

  return (
    <button
      onClick={handleCartClick}
      className={`relative p-2 text-gray-700 hover:text-[#213721] transition-colors duration-300 ${
        isAnimating ? 'animate-pulse' : ''
      }`}
      aria-label="Shopping cart"
    >
      <ShoppingCart size={24} />
      {itemCount > 0 && (
        <span className={`absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center transition-all duration-300 ${
          isAnimating ? 'scale-125' : 'scale-100'
        }`}>
          {itemCount > 99 ? '99+' : itemCount}
        </span>
      )}
    </button>
  );
}; 