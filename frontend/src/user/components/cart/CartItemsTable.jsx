import React, { useState } from 'react';
import { X } from 'lucide-react';
import { useCart } from '../../../context/user/cart/CartContext';

export const CartItemsTable = ({ items }) => {
  const { updateQuantity, removeFromCart, isUpdating } = useCart();
  const [imageErrors, setImageErrors] = useState({});
  const [updatingItems, setUpdatingItems] = useState(new Set());

  const handleQuantityChange = async (productId, newQuantity) => {
    if (newQuantity < 1) return;
    
    setUpdatingItems(prev => new Set(prev).add(productId));
    try {
      await updateQuantity(productId, newQuantity);
    } catch (error) {
      console.error('Failed to update quantity:', error);
    } finally {
      setUpdatingItems(prev => {
        const newSet = new Set(prev);
        newSet.delete(productId);
        return newSet;
      });
    }
  };

  const handleRemoveItem = async (productId) => {
    if (window.confirm('Are you sure you want to remove this item from your cart?')) {
      setUpdatingItems(prev => new Set(prev).add(productId));
      try {
        await removeFromCart(productId);
      } catch (error) {
        console.error('Failed to remove item:', error);
      } finally {
        setUpdatingItems(prev => {
          const newSet = new Set(prev);
          newSet.delete(productId);
          return newSet;
        });
      }
    }
  };

  const handleImageError = (itemId) => {
    setImageErrors(prev => ({ ...prev, [itemId]: true }));
  };

  const getImageUrl = (item) => {
    // If image has already failed to load, show placeholder
    if (imageErrors[item.id]) {
      return 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIHZpZXdCb3g9IjAgMCA2NCA2NCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjY0IiBoZWlnaHQ9IjY0IiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0zMiAzNkMzNC4yMDkxIDM2IDM2IDM0LjIwOTEgMzYgMzJDMzYgMjkuOTA5MSAzNC4yMDkxIDI4IDMyIDI4QzI5LjkwOTEgMjggMjggMjkuOTA5MSAyOCAzMkMyOCAzNC4yMDkxIDI5LjkwOTEgMzYgMzIgMzZaIiBmaWxsPSIjOUI5QkEwIi8+CjxwYXRoIGQ9Ik0zMiA0OEMyOC42ODYzIDQ4IDI2IDQ1LjMxMzcgMjYgNDJIMzhDMzggNDUuMzEzNyAzNS4zMTM3IDQ4IDMyIDQ4WiIgZmlsbD0iIzlCOUJBMCIvPgo8L3N2Zz4K';
    }

    // Try to get the best available image URL
    const product = item.product;
    if (!product) return null;

    // Priority order: imageUrl (virtual field) > image.path > fallback
    if (product.imageUrl) {
      return product.imageUrl;
    }
    
    if (product.image && product.image.path) {
      // If it's already a full URL, use it
      if (product.image.path.startsWith('http')) {
        return product.image.path;
      }
      // Otherwise, construct the URL
      const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';
      return `${baseUrl}/${product.image.path}`;
    }

    return null;
  };

  if (!items || items.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">Your cart is empty</p>
      </div>
    );
  }

  return (
    <>
      {/* Mobile Card Layout */}
      <div className="md:hidden space-y-4">
        {items.map((item) => {
          const imageUrl = getImageUrl(item);
          const productName = item.product?.name || 'Product';
          const productId = item.product?._id || item.productId;
          const isItemUpdating = updatingItems.has(productId);
          
          return (
            <div key={item.id} className={`bg-white border border-gray-200 rounded-lg p-4 ${isItemUpdating ? 'opacity-75' : ''}`}>
              <div className="flex space-x-4">
                {/* Product Image */}
                <div className="flex-shrink-0">
                  <img 
                    src={imageUrl}
                    alt={productName}
                    className="w-20 h-20 object-cover rounded-lg"
                    onError={() => handleImageError(item.id)}
                    loading="lazy"
                  />
                </div>
                
                {/* Product Details */}
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-medium text-gray-900 mb-1">{productName}</h3>
                  <p className="text-sm text-gray-600 mb-2">
                    USD {item.product?.price?.toLocaleString('en-US') || '0'}
                  </p>
                  
                  {/* Quantity Controls */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <button 
                        className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
                        onClick={() => handleQuantityChange(productId, item.quantity - 1)}
                        disabled={isItemUpdating || item.quantity <= 1}
                      >
                        -
                      </button>
                      <input
                        type="number"
                        value={item.quantity}
                        onChange={(e) => {
                          const newQuantity = parseInt(e.target.value) || 1;
                          handleQuantityChange(productId, newQuantity);
                        }}
                        className="w-12 h-8 text-center text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#617C5F] focus:border-[#617C5F]"
                        min="1"
                        disabled={isItemUpdating}
                      />
                      <button 
                        className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
                        onClick={() => handleQuantityChange(productId, item.quantity + 1)}
                        disabled={isItemUpdating}
                      >
                        +
                      </button>
                      {isItemUpdating && (
                        <div className="ml-2">
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-[#617C5F]"></div>
                        </div>
                      )}
                    </div>
                    
                    {/* Remove Button */}
                    <button 
                      className="text-red-500 hover:text-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors p-1"
                      onClick={() => handleRemoveItem(productId)}
                      disabled={isItemUpdating}
                    >
                      <X size={18} />
                    </button>
                  </div>
                  
                  {/* Subtotal */}
                  <div className="mt-2 text-right">
                    <span className="text-sm font-medium text-gray-900">
                      Subtotal: USD {((item.product?.price || 0) * item.quantity).toLocaleString('en-US')}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Desktop Table Layout */}
      <div className="hidden md:block overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">Item</th>
              <th className="py-3 px-6 text-left">Price</th>
              <th className="py-3 px-6 text-center">Qty</th>
              <th className="py-3 px-6 text-right">Subtotal</th>
              <th className="py-3 px-6 text-center"></th>
            </tr>
          </thead>
          <tbody className="text-gray-700 text-sm font-light">
            {items.map((item) => {
              const imageUrl = getImageUrl(item);
              const productName = item.product?.name || 'Product';
              const productId = item.product?._id || item.productId;
              const isItemUpdating = updatingItems.has(productId);
              
              return (
                <tr key={item.id} className={`border-b border-gray-200 hover:bg-gray-50 ${isItemUpdating ? 'opacity-75' : ''}`}>
                  <td className="py-3 px-6 text-left whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="mr-3">
                        <img 
                          src={imageUrl}
                          alt={productName}
                          className="w-16 h-16 object-cover rounded"
                          onError={() => handleImageError(item.id)}
                          loading="lazy"
                        />
                      </div>
                      <span>{productName}</span>
                    </div>
                  </td>
                  <td className="py-3 px-6 text-left">
                    USD {item.product?.price?.toLocaleString('en-US') || '0'}
                  </td>
                  <td className="py-3 px-6 text-center">
                    <div className="flex items-center justify-center space-x-2">
                      <button 
                        className="px-2 py-1 border border-gray-300 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
                        onClick={() => handleQuantityChange(productId, item.quantity - 1)}
                        disabled={isItemUpdating || item.quantity <= 1}
                      >
                        -
                      </button>
                      <input
                        type="number"
                        value={item.quantity}
                        onChange={(e) => {
                          const newQuantity = parseInt(e.target.value) || 1;
                          handleQuantityChange(productId, newQuantity);
                        }}
                        className="w-12 text-center border border-gray-300 rounded py-1 focus:outline-none focus:ring-2 focus:ring-[#617C5F] focus:border-[#617C5F]"
                        min="1"
                        disabled={isItemUpdating}
                      />
                      <button 
                        className="px-2 py-1 border border-gray-300 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
                        onClick={() => handleQuantityChange(productId, item.quantity + 1)}
                        disabled={isItemUpdating}
                      >
                        +
                      </button>
                      {isItemUpdating && (
                        <div className="ml-2">
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-[#617C5F]"></div>
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="py-3 px-6 text-right">
                    USD {((item.product?.price || 0) * item.quantity).toLocaleString('en-US')}
                  </td>
                  <td className="py-3 px-6 text-center">
                    <button 
                      className="text-red-500 hover:text-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      onClick={() => handleRemoveItem(productId)}
                      disabled={isItemUpdating}
                    >
                      <X size={20} />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};