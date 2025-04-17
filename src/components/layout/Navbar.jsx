// src/layout/Navbar.jsx
import React, { useState } from 'react';
import { Menu } from "lucide-react";
import { Link } from "react-router-dom";
import Sidebar from './Sidebar';

const Navbar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <header className="absolute top-0 left-0 w-full z-[100] px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="text-lg font-bold tracking-wide text-white">
            SoulScape
          </div>
          <nav className="hidden md:flex gap-6 text-xl font-medium font-mono uppercase text-[#F2F6EF]">
            <Link to="/" className="hover:text-emerald-300">About</Link>
            <Link to="/services" className="hover:text-emerald-300">Services</Link>
            <Link to="/videos" className="hover:text-emerald-300">Videos</Link>
            <Link to="#" className="hover:text-emerald-300">Merchandise</Link>
            <Link to="#" className="hover:text-emerald-300">Contact Us</Link>
          </nav>
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