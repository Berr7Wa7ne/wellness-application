// src/layout/Navbar.jsx
import React from 'react';
import { Menu } from "lucide-react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <header className="absolute top-0 left-0 w-full z-[100] px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="text-lg font-bold tracking-wide text-white">
          SoulScape
        </div>
        <nav className="hidden md:flex gap-6 text-sm font-medium uppercase text-[#F2F6EF]">
          <Link to="/" className="hover:text-emerald-300">About</Link>
          <Link to="/services" className="hover:text-emerald-300">Services</Link>
          <Link to="#" className="hover:text-emerald-300">Videos</Link>
          <Link to="#" className="hover:text-emerald-300">Merchandise</Link>
          <Link to="#" className="hover:text-emerald-300">Contact Us</Link>
        </nav>
        <button className="md:hidden p-2 rounded">
          <Menu className="h-6 w-6" />
        </button>
      </div>
    </header>
  );
};

export default Navbar;
