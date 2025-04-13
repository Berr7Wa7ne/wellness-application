import React from 'react';
import { Menu } from "lucide-react";

const Navbar = () => {
  return (
    <header className="absolute top-0 left-0 w-full z-20 px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="text-lg font-bold tracking-wide text-white">
          SoulScape
        </div>
        <nav className="hidden md:flex gap-6 text-sm font-medium uppercase text-[#F2F6EF]">
          <a href="#" className="hover:text-emerald-300">Home</a>
          <a href="#" className="hover:text-emerald-300">About</a>
          <a href="#" className="hover:text-emerald-300">Services</a>
          <a href="#" className="hover:text-emerald-300">Videos</a>
          <a href="#" className="hover:text-emerald-300">Merchandise</a>
          <a href="#" className="hover:text-emerald-300">Contact Us</a>
        </nav>
        <button className="md:hidden p-2 rounded">
          <Menu className="h-6 w-6" />
        </button>
      </div>
    </header>
  );
};

export default Navbar;
