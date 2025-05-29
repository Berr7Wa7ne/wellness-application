import React from 'react'
import { Video, Package, Layers, List, FilePlus, Clock } from 'lucide-react';

const activities = [
    { icon: <Video className="w-4 h-4 text-green-600" />, title: 'New video uploaded', time: 'Just now' },
    { icon: <Package className="w-4 h-4 text-green-600" />, title: 'Product stock updated', time: '2 hours ago' },
    { icon: <Layers className="w-4 h-4 text-green-600" />, title: 'New category added', time: '5 hours ago' },
    { icon: <List className="w-4 h-4 text-green-600" />, title: 'Service updated', time: 'Yesterday' },
    { icon: <FilePlus className="w-4 h-4 text-green-600" />, title: 'New tier created', time: '2 days ago' },
  ];

const RecentActivity = () => {
    return (
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <div className="flex justify-between items-center mb-3">
            <div>
              <h2 className="text-lg font-semibold">Recent Activity</h2>
              <p className="text-sm text-gray-500">Latest actions and updates</p>
            </div>
            <Clock className="w-5 h-5 text-gray-400" />
          </div>
          <ul className="space-y-3">
            {activities.map((act, index) => (
              <li key={index} className="flex items-start gap-3 text-sm">
                <div className="mt-1">{act.icon}</div>
                <div>
                  <p className="font-medium">{act.title}</p>
                  <p className="text-gray-500">{act.time}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      );
    }

export default RecentActivity