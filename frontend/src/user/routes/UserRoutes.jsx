import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Layout from '../components/layout/Layout'
import SignInPage from '../pages/SignInPage'
import SignUpPage from '../pages/SignUpPage'
import About from '../pages/About'
import Services from '../pages/Services'
import Videos from '../pages/Videos'
import Merchandise from '../pages/Merchandise'
import Contact from '../pages/Contact'
import ProductPreview from '../pages/ProductPreview'
import CartPage from '../pages/CartPage'
// import other pages when ready (e.g. Services, Contact, etc.)

function UserRoutes({ cartItems, handleAddToCart }) {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<SignInPage />} />
        <Route path="/sign-up" element={<SignUpPage />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/videos" element={<Videos />} />
        <Route path="/merchandise" element={<Merchandise />} />
        <Route path="/product-preview/:slug" element={<ProductPreview handleAddToCart={handleAddToCart} />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/cart" element={<CartPage cartItems={cartItems} />} />
      </Route>
    </Routes>
  );
}

export default UserRoutes
