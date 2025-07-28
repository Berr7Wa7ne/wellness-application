import React, { useState, useEffect } from 'react'
import { Search, Filter } from 'lucide-react'
import AddVideoForm from './AddVideoForm'
import AdminModal from '../shared/AdminModal'
import { useAdminCategory } from '../../../context/admin/category/AdminCategoryContext'

const VIDEO_CATEGORIES = ["Meditation Videos", "Audio Guides"];

const ManageVideosHeader = ({ selectedCategory, setSelectedCategory }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { categories, fetchCategories, categoriesLoading } = useAdminCategory();

    useEffect(() => {
      fetchCategories();
    }, [fetchCategories]);

    const videoCategories = categories.filter(cat =>
      VIDEO_CATEGORIES.includes(cat.name)
    );

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    return (
        <div className="p-6">
          {/* Header Area */}
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-xl font-semibold">Manage Videos</h2>
              <p className="text-sm text-gray-500">Upload, organize and control your video content</p>
            </div>
            <button 
              className="bg-[#213721] w-[135px] h-[40px] text-white px-4 py-2 rounded-md hover:bg-green-700 text-sm font-semibold"
              onClick={toggleModal}
            >
              + Add Video
            </button>
          </div>
    
          {/* Search Bar */}
          <div className="flex justify-between">
            <div className="mb-4 relative">
              <div className="flex items-center">
                <input
                  type="text"
                  placeholder="Search videos..."
                  className="w-[700px] h-[44px] pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#7fa876] text-sm"
                />
                <Search className="absolute left-3 text-gray-400" size={18} />
              </div>
            </div>
            <div className="mb-4 relative">
              <select
                value={selectedCategory}
                onChange={e => setSelectedCategory(e.target.value)}
                className="w-[180px] h-[44px] pl-3 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#7fa876] text-sm"
                disabled={categoriesLoading}
              >
                <option value="all">All Categories</option>
                {videoCategories.map(cat => (
                  <option key={cat._id} value={cat._id}>{cat.name}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Add Video Modal */}
          <AdminModal isOpen={isModalOpen} onClose={toggleModal}>
            <AddVideoForm onClose={toggleModal} />
          </AdminModal>

        </div>
      );
    };

export default ManageVideosHeader