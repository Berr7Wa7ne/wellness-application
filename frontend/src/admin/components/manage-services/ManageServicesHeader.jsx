import React, { useState } from 'react'
import { Search, Filter } from 'lucide-react'
import AddServiceForm from './AddServiceForm'
import AdminModal from '../shared/AdminModal'

const ManageServicesHeader = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const toggleModal = () => {
      setIsModalOpen(!isModalOpen);
    };

    return (
        <div className="p-6">
          {/* Header Area */}
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-xl font-semibold">Manage Services</h2>
              <p className="text-sm text-gray-500">Configure and manage your service offerings</p>
            </div>
            <button 
              onClick={toggleModal}
              className="bg-[#213721] w-[135px] h-[40px] text-white px-4 py-2 rounded-md hover:bg-green-700 text-sm font-semibold"
            >
              + Add Service
            </button>
          </div>
    
          {/* Search Bar */}
          <div className="flex justify-between">
            <div className="mb-4 relative">
              <div className="flex items-center">
                <input
                  type="text"
                  placeholder="Search products..."
                  className="w-[700px] h-[44px] pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#7fa876] text-sm"
                />
                <Search className="absolute left-3 text-gray-400" size={18} />
              </div>
            </div>
            <div className="mb-4 relative">
              <div className="flex items-center">
                <button
                  className="w-[140px] h-[44px] pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#7fa876] text-sm"
                >
                  Category: All
                </button>
                <Filter className="absolute left-3 text-gray-400" size={18} />
              </div>
            </div>
            <div className="mb-4 relative">
              <div className="flex items-center">
                <button
                  className="w-[140px] h-[44px] pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#7fa876] text-sm"
                >
                  Tier: All
                </button>
                <Filter className="absolute left-3 text-gray-400" size={18} />
              </div>
            </div>
          </div>

          {/* Add Service Modal */}
          <AdminModal isOpen={isModalOpen} onClose={toggleModal}>
            <AddServiceForm onClose={toggleModal} />
          </AdminModal>
        </div>
      );
    };

export default ManageServicesHeader