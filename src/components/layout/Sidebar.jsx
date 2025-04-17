// src/components/Sidebar.jsx
import React from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { Link } from "react-router-dom";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  return (
    <div className={`fixed inset-0 z-[110] bg-[#F2F6EF] flex flex-col md:hidden transition-transform duration-300 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
      {/* Close button at top-right */}
      <div className="flex justify-between p-5">
      <div className="text-lg font-bold tracking-wide text-[#617C5F]">
            SoulScape
          </div>
        <AiOutlineClose
          size={30}
          className="cursor-pointer text-[#617C5F]"
          onClick={toggleSidebar}
        />
      </div>
      
      {/* Navigation links */}
      <nav className="flex-grow ml-4 mt-8 space-y-8">
        <Link 
          to="/" 
          className="block text-[#617C5F] hover:text-emerald-300 text-xl p-4"
          onClick={toggleSidebar}
        >
          About
        </Link>
        <Link 
          to="/services" 
          className="block text-[#617C5F] hover:text-emerald-300 text-xl p-4"
          onClick={toggleSidebar}
        >
          Services
        </Link>
        <Link 
          to="/videos" 
          className="block text-[#617C5F] hover:text-emerald-300 text-xl p-4"
          onClick={toggleSidebar}
        >
          Videos
        </Link>
        <Link 
          to="#" 
          className="block text-[#617C5F] hover:text-emerald-300 text-xl p-4"
          onClick={toggleSidebar}
        >
          Merchandise
        </Link>
        <Link 
          to="#" 
          className="block text-[#617C5F] hover:text-emerald-300 text-xl p-4"
          onClick={toggleSidebar}
        >
          Contact Us
        </Link>
      </nav>
    </div>
  );
};

export default Sidebar;