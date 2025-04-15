// src/layout/Layout.jsx
import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './Navbar';

const Layout = () => {
  const location = useLocation();
  const isHeroPage = ["/", "/services"].includes(location.pathname); // Adjust as needed

  return (
    <div className="relative min-h-screen">
      {isHeroPage ? null : <Navbar />} {/* Avoid duplicate Navbar on hero pages */}
      <main className="pt-0">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
