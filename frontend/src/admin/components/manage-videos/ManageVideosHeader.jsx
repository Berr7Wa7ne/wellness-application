import React from 'react'
import { Search, Filter } from 'lucide-react'

const ManageVideosHeader = () => {
    return (
        <div className="p-6">
          {/* Header Area */}
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-xl font-semibold">Manage Videos</h2>
              <p className="text-sm text-gray-500">Upload, organize and control your video content</p>
            </div>
            <button className="bg-[#213721] text-white px-4 py-2 rounded-md hover:bg-green-700 text-sm">
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
              <div className="flex items-center">
                <input
                  type="text"
                  placeholder="All"
                  className="w-[135px] h-[44px] pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#7fa876] text-sm"
                />
                <Filter className="absolute left-3 text-gray-400" size={18} />
              </div>
            </div>
            <div className="mb-4 relative">
              <div className="flex items-center">
                <input
                  type="text"
                  placeholder="All"
                  className="w-[135px] h-[44px] pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#7fa876] text-sm"
                />
                <Filter className="absolute left-3 text-gray-400" size={18} />
              </div>
            </div>
          </div>
    
        </div>
      );
    };

export default ManageVideosHeader