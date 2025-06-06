import React, { useState } from 'react'
import { Search, Filter } from 'lucide-react'
import AddProductForm from './AddProductForm'
import AdminModal from '../shared/AdminModal'

const ManageProductHeader = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   // Handle form submission here
  //   setIsModalOpen(false);
  // };

  return (
    <div className="p-6">
      {/* Header Area */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-semibold">Manage Products</h2>
          <p className="text-sm text-gray-500">Create, edit, and manage your products catalog</p>
        </div>
        <button 
          className="bg-[#213721] w-[135px] h-[40px] text-white px-4 py-2 rounded-md hover:bg-green-700 text-sm font-semibold"
          onClick={toggleModal}
        >
          + Add Product
        </button>
      </div>

      {/* Search and Filter Area */}
      <div className="flex items-center gap-4 mb-4">
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Search products..."
            className="w-full h-[44px] pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#7fa876] text-sm"
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
        </div>
        <div className="relative">
          <button
            className="w-[140px] h-[44px] pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#7fa876] text-sm"
          >
            Category: All
          </button>
          <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
        </div>
        <div className="relative">
          <button
            className="w-[140px] h-[44px] pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#7fa876] text-sm"
          >
            Tier: All
          </button>
          <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
        </div>
      </div>

      {/* Add Product Modal */}
      <AdminModal isOpen={isModalOpen} onClose={toggleModal}>
        <AddProductForm onClose={toggleModal} />
      </AdminModal>

    </div>
  );
};

export default ManageProductHeader