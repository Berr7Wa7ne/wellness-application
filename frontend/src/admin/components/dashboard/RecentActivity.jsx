import React from 'react';
import { Video, Package, Layers, List, FilePlus, Clock } from 'lucide-react';

const iconTypeMap = {
  video: <Video className="w-4 h-4 text-green-600" />,
  product: <Package className="w-4 h-4 text-green-600" />,
  category: <Layers className="w-4 h-4 text-green-600" />,
  service: <List className="w-4 h-4 text-green-600" />,
  tier: <FilePlus className="w-4 h-4 text-green-600" />,
};

const RecentActivity = ({ activity, loading, error }) => {
  if (loading) {
    return <div className="bg-white rounded-lg p-4 shadow-sm">Loading activity...</div>;
  }
  if (error) {
    return <div className="bg-white rounded-lg p-4 shadow-sm text-red-500">{error}</div>;
  }
  if (!activity) {
    return null;
  }
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
        {activity.map((act, index) => (
          <li key={index} className="flex items-start gap-3 text-sm">
            <div className="mt-1">{iconTypeMap[act.type] || <FilePlus className="w-4 h-4 text-green-600" />}</div>
            <div>
              <p className="font-medium">{act.action}{act.title ? `: ${act.title}` : ''}</p>
              <p className="text-gray-500">{new Date(act.time).toLocaleString()}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecentActivity;