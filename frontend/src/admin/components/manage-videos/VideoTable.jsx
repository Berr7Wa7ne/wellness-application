import React, { useState, useEffect } from 'react';
import { MoreVertical } from 'lucide-react';
import Frame1 from '../../../assets/Frame1.png';
import Frame2 from '../../../assets/Frame 2.png';
import Frame3 from '../../../assets/Frame 3.png';
import Frame4 from '../../../assets/Frame 4.png';
import Frame5 from '../../../assets/Frame 5.png';
import Frame6 from '../../../assets/Frame 6.png';
import Frame7 from '../../../assets/Frame 7.png';
import AddVideoForm from './AddVideoForm';
import { useAdminVideo } from '../../../context/admin/video/AdminVideoContext';
import { useAdminCategory } from '../../../context/admin/category/AdminCategoryContext';
import AdminModal from '../shared/AdminModal';

// // Add at the top, after your imports
// const categoryColors = {
//     'Magickal Oils': "bg-purple-100 text-purple-800",
//     'Meditation Videos': "bg-green-100 text-green-600",
//     'Licenses': "bg-rose-100 text-rose-600",
//     'Audio Guides': "bg-orange-100 text-orange-600",
//     'Healing Tools': "bg-blue-100 text-blue-600",
//     'Books & Journals': "bg-cyan-100 text-cyan-600",
//   };
  
//   const statusColors = {
//     Published: "bg-green-100 text-green-600",
//     Draft: "bg-gray-200 text-gray-700",
//     Scheduled: "bg-blue-100 text-blue-600",
//   };

// const videos = [
//   {
//     id: 1,
//     title: 'Morning Meditation for Beginners',
//     category: 'Meditation Videos',
//     duration: '15:30',
//     status: 'Published',
//     publishedDate: 'May 25, 2025',
//     views: '1,245',
//     thumbnail: Frame1,
//   },
//   {
//     id: 2,
//     title: 'Gentle Yoga Flow for Stress Relief',
//     category: 'Meditation Videos',
//     duration: '25:15',
//     status: 'Published',
//     publishedDate: 'Jun 2, 2025',
//     views: '985',
//     thumbnail: Frame2,
//   },
//   {
//     id: 3,
//     title: 'Mindfulness Techniques for Anxiety',
//     category: 'Audio Guides',
//     duration: '10:45',
//     status: 'Draft',
//     publishedDate: 'Jun 5, 2025',
//     views: '756',
//     thumbnail: Frame3,
//   },
//   {
//     id: 4,
//     title: 'Holistic Wellness Practices',
//     category: 'Healing Tools',
//     duration: '20:00',
//     status: 'Scheduled',
//     publishedDate: 'Jun 8, 2025',
//     views: '1,120',
//     thumbnail: Frame4,
//   },
//   {
//     id: 5,
//     title: 'Nutrition Basics: Foods for Energy',
//     category: 'Books & Journals',
//     duration: '18:30',
//     status: 'Published',
//     publishedDate: 'Jun 10, 2025',
//     views: '890',
//     thumbnail: Frame5,
//   },
//   {
//     id: 6,
//     title: 'Deep Relaxation Meditation',
//     category: 'Meditation Videos',
//     duration: '22:15',
//     status: 'Published',
//     publishedDate: 'Jun 12, 2025',
//     views: '1,450',
//     thumbnail: Frame6,
//   },
//   {
//     id: 7,
//     title: 'Intermediate Yoga Flow',
//     category: 'Meditation Videos',
//     duration: '30:00',
//     status: 'Draft',
//     publishedDate: 'Jun 15, 2025',
//     views: '2,100',
//     thumbnail: Frame7,
//   },
// ];

console.log('VITE_BACKEND_URL:', import.meta.env.VITE_BACKEND_URL);

const VideoTable = () => {
  const { videos: contextVideos, deleteVideo, fetchVideos } = useAdminVideo();
  const { categories, fetchCategories } = useAdminCategory();
  const [showModal, setShowModal] = useState(false);
  const [editingVideo, setEditingVideo] = useState(null);
  const [actionMenuIndex, setActionMenuIndex] = useState(null);

  console.log('[VideoTable] Rendered. Videos:', contextVideos, 'Categories:', categories);

  useEffect(() => {
    if (!categories || categories.length === 0) {
      console.log('[VideoTable] Fetching categories...');
      fetchCategories();
    }
  }, [fetchCategories]);

  useEffect(() => {
    console.log('[VideoTable] useEffect called. Videos:', contextVideos);
    if (!contextVideos || contextVideos.length === 0) {
      console.log('[VideoTable] Fetching videos...');
      fetchVideos();
    }
  }, [fetchVideos]);

  const handleEdit = (video) => {
    setEditingVideo(video);
    setShowModal(true);
    setActionMenuIndex(null);
  };

  const handleDelete = async (video) => {
    if (window.confirm('Are you sure you want to delete this video?')) {
      await deleteVideo(video._id);
    }
    setActionMenuIndex(null);
  };

  return (
    <div className="m-6 overflow-x-auto border border-gray-400 rounded-lg relative">
      <table className="min-w-full text-sm bg-[#FCFCFC]">
        <thead>
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
          {contextVideos.map((video, index) => {
            // Log the image URL for each video
            console.log('Video image URL:', video.imageUrl, 'for video:', video.title);
            const categoryObj = categories.find(
              cat => cat._id === (video.category?._id || video.category)
            );
            console.log('[VideoTable] Video:', video, 'CategoryObj:', categoryObj, 'ImageUrl:', video.imageUrl);
            return (
              <tr key={video._id || video.id} className={`hover:bg-gray-50 ${index !== contextVideos.length - 1 ? 'border-b border-[#3330304D]' : ''}`}>
<td className="p-3 flex items-center gap-3 font-semibold">
  <div className="relative">
    <img
      src={video.imageUrl || '/images/video-placeholder.png'}
      alt={video.title}
      className="w-[65px] h-[53px] object-cover rounded"
      onError={() => console.log('Image failed to load:', video.imageUrl, 'for video:', video.title)}
    />
    {video.duration && (
      <span className="absolute inset-0 flex items-center justify-center bg-opacity-60 text-gray-200 text-xs font-semibold rounded">
        {video.duration}
      </span>
    )}
  </div>
  <span>{video.title}</span>
</td>
                <td className="p-3 text-center">
                <span
  className="px-3 py-1 rounded-full text-xs font-semibold"
  style={{
    backgroundColor: categoryObj?.backgroundColor || "#f3f3f3",
    color: categoryObj?.textColor || "#333",
    whiteSpace: "nowrap",
    // overflow: "hidden",
    // textOverflow: "ellipsis",
    // maxWidth: "120px", // adjust as needed
    display: "inline-block", // needed for ellipsis to work
    verticalAlign: "middle"
  }}
>
  {categoryObj?.name || video.category?.name || video.category}
</span>
                </td>
                <td className="p-3 font-semibold text-center">{video.duration}</td>
                <td className="p-3 text-center">
                  <span
                    className="px-3 py-1 rounded-full text-xs font-semibold"
                    style={{
                      backgroundColor: video.status === 'Published' ? '#E8F5E9' : video.backgroundColor || '#f3f3f3',
                      color: video.status === 'Published' ? '#388e3c' : video.textColor || '#333'
                    }}
                  >
                    {video.status}
                  </span>
                </td>
                <td className="p-3 font-semibold text-center">
                  {video.status === 'Published' && video.published && (
                    <>Published on {new Date(video.published).toLocaleDateString()}</>
                  )}
                  {video.status === 'Scheduled' && video.published && (
                    <>Scheduled for {new Date(video.published).toLocaleDateString()}</>
                  )}
                </td>
                <td className="p-3 font-semibold text-center">{video.views}</td>
                <td className="p-3 text-center relative">
                  <button className="p-1 rounded hover:bg-gray-200" onClick={() => setActionMenuIndex(index)}>
                    <MoreVertical size={16} />
                  </button>
                  {actionMenuIndex === index && (
                    <div className="absolute right-0 mt-2 w-28 bg-white border border-gray-200 rounded shadow z-10">
                      <button className="block w-full text-left px-4 py-2 hover:bg-gray-100" onClick={() => handleEdit(video)}>Edit</button>
                      <button className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-red-600" onClick={() => handleDelete(video)}>Delete</button>
                    </div>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {showModal && (
        <AdminModal isOpen={showModal} onClose={() => setShowModal(false)}>
          <AddVideoForm onClose={() => setShowModal(false)} editingVideo={editingVideo} />
        </AdminModal>
      )}
    </div>
  );
};

export default VideoTable;
