import { Routes, Route } from 'react-router-dom';
import React from 'react';
import AdminRoot from './admin/AdminRoot';
import UserRoutes from './user/routes/UserRoutes';
import { CartProvider } from './context/user/cart/CartContext';

function App() {
  return (
    <CartProvider>
      <Routes>
        {/* Admin Panel Routes */}
        <Route path="/admin/*" element={<AdminRoot />} />

        {/* User (Customer) Site Routes */}
        <Route path="/*" element={<UserRoutes />} />
      </Routes>
    </CartProvider>
  );
}

export default App;
