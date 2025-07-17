import React from 'react';
import { Video, Package, List, Layers } from 'lucide-react';

const iconMap = {
  totalVideos: <Video className="w-6 h-6 text-green-600" />,
  totalProducts: <Package className="w-6 h-6 text-green-600" />,
  totalServices: <List className="w-6 h-6 text-green-600" />,
  totalCategories: <Layers className="w-6 h-6 text-green-600" />,
};

const labelMap = {
  totalVideos: 'Total Videos',
  totalProducts: 'Products',
  totalServices: 'Services',
  totalCategories: 'Categories',
};

const DashboardStats = ({ stats, loading, error }) => {
  if (loading) {
    return <div className="p-6">Loading stats...</div>;
  }
  if (error) {
    return <div className="p-6 text-red-500">{error}</div>;
  }
  if (!stats) {
    return null;
  }
  // Map stats to array for rendering
  const statKeys = ['totalVideos', 'totalProducts', 'totalServices', 'totalCategories'];
  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-1">Dashboard Overview</h2>
      <p className="text-gray-600 mb-6">
        Welcome back! Here’s what’s happening with your content and services.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {statKeys.map((key) => (
          <div
            key={key}
            className="flex justify-between items-center p-4 border border-gray-200 rounded-lg shadow-sm bg-white hover:shadow-md transition"
          >
            <div>
              <h4 className="text-sm text-gray-500">{labelMap[key]}</h4>
              <p className="text-2xl font-semibold">{stats[key]}</p>
              {/* You can add change % if backend provides it */}
            </div>
            <div className="p-2 bg-gray-100 rounded-md">{iconMap[key]}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardStats;