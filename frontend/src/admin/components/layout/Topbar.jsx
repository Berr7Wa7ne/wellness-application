// Topbar.jsx
import React from 'react';
import {
  Search,
  Filter,
  Bell,
  Clock,
  Settings,
} from 'lucide-react';

const Topbar = () => {
  return (
    <div className="flex justify-between items-center px-4 py-2 bg-white shadow-sm">
      {/* Search Box */}
      <div className="relative">
        <Search className="absolute left-3 top-2.5 text-gray-400" size={16} />
        <input
          type="text"
          placeholder="Search..."
          className="pl-10 pr-4 py-2 border border-[#899F87] rounded-md text-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-600"
        />
      </div>

      {/* Icons */}
      <div className="flex items-center gap-3">
        <button className="relative bg-gray-100 p-2 rounded-full hover:bg-gray-200">
          <Filter size={16} className="text-gray-600" />
        </button>

        <button className="relative bg-gray-100 p-2 rounded-full hover:bg-gray-200">
          <Bell size={16} className="text-gray-600" />
          {/* Red Notification Dot */}
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
        </button>

        <button className="bg-gray-100 p-2 rounded-full hover:bg-gray-200">
          <Clock size={16} className="text-gray-600" />
        </button>

        <button className="bg-gray-100 p-2 rounded-full hover:bg-gray-200">
          <Settings size={16} className="text-gray-600" />
        </button>
      </div>
    </div>
  );
};

export default Topbar;
