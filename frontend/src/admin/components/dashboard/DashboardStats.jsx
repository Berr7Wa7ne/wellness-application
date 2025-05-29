import React from 'react'
import { Video, Package, List, Layers } from 'lucide-react';


const stats = [
  {
    title: "Total Videos",
    value: 218,
    change: "+17% this week",
    changeColor: "text-green-500",
    icon: <Video className="w-6 h-6 text-black" />,
  },
  {
    title: "Products",
    value: 43,
    change: "+5.3% this week",
    changeColor: "text-green-500",
    icon: <Package className="w-6 h-6 text-black" />,
  },
  {
    title: "Services",
    value: 19,
    change: "−2.8% this week",
    changeColor: "text-red-500",
    icon: <List className="w-6 h-6 text-black" />,
  },
  {
    title: "Categories",
    value: 12,
    change: "+1% this week",
    changeColor: "text-green-500",
    icon: <Layers className="w-6 h-6 text-black" />,
  },
];

const DashboardStats = () => {
  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-1">Dashboard Overview</h2>
      <p className="text-gray-600 mb-6">
        Welcome back! Here’s what’s happening with your content and services.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((item, idx) => (
          <div
            key={idx}
            className="flex justify-between items-center p-4 border border-gray-200 rounded-lg shadow-sm bg-white hover:shadow-md transition"
          >
            <div>
              <h4 className="text-sm text-gray-500">{item.title}</h4>
              <p className="text-2xl font-semibold">{item.value}</p>
              <p className={`text-sm ${item.changeColor}`}>{item.change}</p>
            </div>
            <div className="p-2 bg-gray-100 rounded-md">{item.icon}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DashboardStats