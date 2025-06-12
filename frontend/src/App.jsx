import { Routes, Route } from 'react-router-dom';
import React, { useState } from 'react';
import AdminRoutes from './admin/routes/AdminRoutes';
import UserRoutes from './user/routes/UserRoutes';

function App() {
  const [cartItems, setCartItems] = useState([]);

  const handleAddToCart = (product) => {
    setCartItems((prevItems) => {
      const productWithParsedPrice = {
        ...product,
        price: parseFloat(product.price.replace(/[^0-9.]/g, '')), // More robust: remove all non-digit/dot characters
      };

      const existingItem = prevItems.find(item => item.name === productWithParsedPrice.name);
      if (existingItem) {
        return prevItems.map(item =>
          item.name === productWithParsedPrice.name
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevItems, { ...productWithParsedPrice, quantity: 1 }];
      }
    });
  };

  return (
    <Routes>
      {/* Admin Panel Routes */}
      <Route path="/admin/*" element={<AdminRoutes />} />

      {/* User (Customer) Site Routes */}
      <Route path="/*" element={<UserRoutes cartItems={cartItems} handleAddToCart={handleAddToCart} />} />
    </Routes>
  );
}

export default App;
