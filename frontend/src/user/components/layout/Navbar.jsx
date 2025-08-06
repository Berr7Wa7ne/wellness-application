// src/layout/Navbar.jsx
import React, { useState } from 'react';
import { Menu } from "lucide-react";
import { NavLink, Link } from "react-router-dom";
import Sidebar from './Sidebar';
import { CartIcon } from '../shared/CartIcon';

const Navbar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleLogout = () => {
    // Remove token from localStorage
    localStorage.removeItem('token');
    // Redirect to login page
    navigate('/');
  };

  return (
    <>
      <header className="fixed top-0 left-0 w-full z-[100] px-6 bg-black/70">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="text-2xl font-bold tracking-wide text-white">
            SoulScape
          </div>
          <nav className="hidden md:flex gap-6 text-xl font-medium font-mono uppercase text-white">
            <NavLink 
              to="/about" 
              className={({ isActive }) =>
                isActive ? "text-emerald-300" : "hover:text-emerald-300"
              }
            >
              About
            </NavLink>
            <NavLink 
              to="/services" 
              className={({ isActive }) =>
                isActive ? "text-emerald-300" : "hover:text-emerald-300"
              }
            >
              Services
            </NavLink>
            <NavLink 
              to="/videos" 
              className={({ isActive }) =>
                isActive ? "text-emerald-300" : "hover:text-emerald-300"
              }
            >
              Videos
            </NavLink>
            <NavLink 
              to="/merchandise" 
              className={({ isActive }) =>
                isActive ? "text-emerald-300" : "hover:text-emerald-300"
              }
            >
              Merchandise
            </NavLink>
            <NavLink 
              to="/contact" 
              className={({ isActive }) =>
                isActive ? "text-emerald-300" : "hover:text-emerald-300"
              }
            >
              Contact Us
            </NavLink>
          </nav>
          <div className='hidden md:flex justify-between items-center space-x-4 my-6'>
            <CartIcon />
            <Link
                to="/"
                onClick={handleLogout}
                className='bg-[#617C5F] text-white px-[33px] py-[10px] shadow hover:bg-green-800 font-semibold'
            >
                Sign Out
            </Link>
            <Link
                to="/sign-up"
                className='bg-[#213721] text-white px-[33px] py-[10px] shadow hover:bg-green-800 font-semibold'
            >
                Sign Up
            </Link>
          </div>
          {/* Hamburger - only shows when sidebar is closed */}
          {!isSidebarOpen && (
            <button 
              className="md:hidden p-2 rounded text-white"
              onClick={toggleSidebar}
            >
              <Menu className="h-6 w-6" />
            </button>
          )}
        </div>
      </header>
      
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
    </>
  );
};

export default Navbar;