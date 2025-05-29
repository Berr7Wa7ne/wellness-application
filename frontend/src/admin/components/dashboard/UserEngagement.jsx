import React from 'react'
import { User } from 'lucide-react';

const engagementData = [
    { label: 'Active Users', value: 8249, percent: 82 },
    { label: 'Conversion Rate', value: '5.7%', percent: 57 },
    { label: 'Session Duration', value: '4m 23s', percent: 44 },
    { label: 'Bounce Rate', value: '32.4%', percent: 32 },
];

const UserEngagement = () => {
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
}

export default UserEngagement