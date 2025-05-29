import React from 'react';
import { MoreVertical } from 'lucide-react';
import Frame1 from '../../../assets/Frame1.png';
import Frame2 from '../../../assets/Frame 2.png';
import Frame3 from '../../../assets/Frame 3.png';
import Frame4 from '../../../assets/Frame 4.png';
import Frame5 from '../../../assets/Frame 5.png';
import Frame6 from '../../../assets/Frame 6.png';
import Frame7 from '../../../assets/Frame 7.png';

// Add at the top, after your imports
const categoryColors = {
    Meditation: "bg-blue-100 text-blue-600",
    Yoga: "bg-green-100 text-green-600",
    Mindfulness: "bg-purple-100 text-purple-600",
    Wellness: "bg-yellow-100 text-yellow-700",
    Nutrition: "bg-pink-100 text-pink-600",
  };
  
  const statusColors = {
    Published: "bg-green-100 text-green-600",
    Draft: "bg-gray-200 text-gray-700",
    Scheduled: "bg-blue-100 text-blue-600",
  };

const videos = [
  {
    id: 1,
    title: 'Morning Meditation for Beginners',
    category: 'Meditation',
    duration: '15:30',
    status: 'Published',
    publishedDate: 'May 25, 2025',
    views: '1,245',
    thumbnail: Frame1,
  },
  {
    id: 2,
    title: 'Gentle Yoga Flow for Stress Relief',
    category: 'Yoga',
    duration: '25:15',
    status: 'Published',
    publishedDate: 'Jun 2, 2025',
    views: '985',
    thumbnail: Frame2,
  },
  {
    id: 3,
    title: 'Mindfulness Techniques for Anxiety',
    category: 'Mindfulness',
    duration: '10:45',
    status: 'Draft',
    publishedDate: 'Jun 5, 2025',
    views: '756',
    thumbnail: Frame3,
  },
  {
    id: 4,
    title: 'Holistic Wellness Practices',
    category: 'Wellness',
    duration: '20:00',
    status: 'Scheduled',
    publishedDate: 'Jun 8, 2025',
    views: '1,120',
    thumbnail: Frame4,
  },
  {
    id: 5,
    title: 'Nutrition Basics: Foods for Energy',
    category: 'Nutrition',
    duration: '18:30',
    status: 'Published',
    publishedDate: 'Jun 10, 2025',
    views: '890',
    thumbnail: Frame5,
  },
  {
    id: 6,
    title: 'Deep Relaxation Meditation',
    category: 'Meditation',
    duration: '22:15',
    status: 'Published',
    publishedDate: 'Jun 12, 2025',
    views: '1,450',
    thumbnail: Frame6,
  },
  {
    id: 7,
    title: 'Intermediate Yoga Flow',
    category: 'Yoga',
    duration: '30:00',
    status: 'Draft',
    publishedDate: 'Jun 15, 2025',
    views: '2,100',
    thumbnail: Frame7,
  },
];

const VideoTable = () => {
  return (
    <div className="m-6 overflow-x-auto border border-gray-400 rounded-lg">
      <table className="min-w-full text-sm bg-[#FCFCFC]">
        <thead className="">
          <tr className="text-left">
            <th className="p-3 border-b border-gray-400">Video</th>
            <th className="p-3 border-b border-gray-400 text-center">Category</th>
            <th className="p-3 border-b border-gray-400 text-center">Duration</th>
            <th className="p-3 border-b border-gray-400 text-center">Status</th>
            <th className="p-3 border-b border-gray-400 text-center">Published</th>
            <th className="p-3 border-b border-gray-400 text-center">Views</th>
            <th className="p-3 border-b border-gray-400 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {videos.map((video, index) => (
            <tr 
              key={video.id} 
              className={`hover:bg-gray-50 ${index !== videos.length - 1 ? 'border-b border-[#3330304D]' : ''}`}
            >
              <td className="p-3 flex items-center gap-3 font-semibold">
                <img src={video.thumbnail} alt={video.title} className="w-[65px] h-[53px] object-cover rounded" />
                <span>{video.title}</span>
              </td>
              <td className="p-3 text-center">
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${categoryColors[video.category] || "bg-gray-100 text-gray-600"}`}>
                    {video.category}
                </span>
                </td>
              <td className="p-3 font-semibold text-center">{video.duration}</td>
              <td className="p-3 text-center">
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusColors[video.status] || "bg-gray-100 text-gray-600"}`}>
                    {video.status}
                </span>
                </td>
              <td className="p-3 font-semibold text-center">{video.publishedDate}</td>
              <td className="p-3 font-semibold text-center  ">{video.views}</td>
              <td className="p-3 text-center">
                <button className="p-1 rounded hover:bg-gray-200">
                  <MoreVertical size={16} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default VideoTable;
