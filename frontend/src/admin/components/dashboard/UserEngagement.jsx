import React from 'react';
import { User } from 'lucide-react';

const UserEngagement = ({ engagement, loading, error }) => {
  if (loading) {
    return <div className="bg-white rounded-lg p-4 shadow-sm w-full">Loading engagement...</div>;
  }
  if (error) {
    return <div className="bg-white rounded-lg p-4 shadow-sm w-full text-red-500">{error}</div>;
  }
  if (!engagement) {
    return null;
  }
  // Prepare data for rendering
  const engagementData = [
    { label: 'Active Users', value: engagement.activeUsers, percent: engagement.activeUsers ? Math.min(100, Math.round((engagement.activeUsers / (engagement.totalUsers || engagement.activeUsers)) * 100)) : 0 },
    { label: 'Conversion Rate', value: engagement.conversionRate, percent: parseFloat(engagement.conversionRate) || 0 },
    { label: 'Session Duration', value: engagement.sessionDuration, percent: 44 }, // Placeholder
    { label: 'Bounce Rate', value: engagement.bounceRate, percent: parseFloat(engagement.bounceRate) || 0 },
  ];
  return (
    <div className="bg-white rounded-lg p-4 shadow-sm w-full">
      <div className="flex items-center justify-between mb-1">
        <div className="flex items-center justify-between gap-64">
          <h2 className="text-lg font-semibold">User Engagement</h2>
          <User className="w-5 h-5 text-gray-400 ml-7" />
        </div>
      </div>
      <p className="text-sm text-gray-500 mb-4">Visitor statistics and engagement metrics</p>
      <ul className="space-y-5">
        {engagementData.map((item, i) => (
          <li key={i}>
            <div className="flex justify-between mb-1 text-sm font-medium">
              <span>{item.label}</span>
              <span>{item.value}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div
                className="bg-[#213721] h-2.5 rounded-full"
                style={{ width: `${item.percent}%` }}
              ></div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserEngagement;