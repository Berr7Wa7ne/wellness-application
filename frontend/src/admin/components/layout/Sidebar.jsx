// Sidebar.jsx
import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutGrid, 
  Video, 
  Box, 
  Server, 
  Layers, 
  Table,
  LogOut
} from 'lucide-react'; // Using lucide-react for icons

const menuItems = [
  { name: "Dashboard", icon: <LayoutGrid size={18} />, path: "/admin/dashboard" },
  { name: "Manage Videos", icon: <Video size={18} />, path: "/admin/videos", badge: 4 },
  { name: "Manage Products", icon: <Box size={18} />, path: "/admin/products" },
  { name: "Manage Services", icon: <Server size={18} />, path: "/admin/services" },
  { name: "Manage Tiers", icon: <Layers size={18} />, path: "/admin/tiers" },
  { name: "Manage Categories", icon: <Table size={18} />, path: "/admin/categories" },
];

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    // TODO: Implement logout logic (clear tokens, etc.)
    // For now, just redirect to login page
    navigate('/login');
  };

  return (
    <div className="fixed top-0 left-0 w-64 h-screen bg-[#213721] shadow-md flex flex-col justify-between z-20">
      {/* Top Section */}
      <div className='mx-2'>
        <div className="p-4 font-bold text-lg text-white">SoulScape</div>
        <ul>
          {menuItems.map((item, idx) => {
            // console.log(`Current Path: ${window.location.pathname}, Item Path: ${item.path}`); // Remove console.log
            return (
            <li key={idx}>
              <Link to={item.path}>
                <div
                  className={`mb-3 flex items-center justify-between px-4 py-2 cursor-pointer ${
                    item.path === '/admin/dashboard' 
                      ? location.pathname === '/admin/dashboard'
                      ? "bg-white text-[#213721] rounded-md"
                      : "text-white hover:bg-gray-100 hover:rounded-md hover:text-green-700"
                    : location.pathname.startsWith(item.path)
                      ? "bg-white text-[#213721] rounded-md"
                      : "text-white hover:bg-gray-100 hover:rounded-md hover:text-green-700"
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    {item.icon}
                    <span className="text-sm">{item.name}</span>
                  </div>
                  {item.badge && (
                    <span className="bg-gray-200 text-xs text-gray-600 rounded-full px-2 py-0.5">
                      {item.badge}
                    </span>
                  )}
                </div>
              </Link>
            </li>
             );
           })}
        </ul>
      </div>

      {/* Bottom User Section */}
      <div className="px-4 py-4 border-t border-gray-700">
        <div className="text-sm text-white mb-2">
          <div className="font-medium">Admin User</div>
          <div className="text-xs text-gray-300">admin@example.com</div>
        </div>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-2 px-4 py-2 text-sm text-white hover:bg-gray-100 hover:text-green-700 rounded-md transition-colors"
        >
          <LogOut size={16} />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
