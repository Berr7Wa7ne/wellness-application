import React, { useState } from 'react'
import AdminModal from '../shared/AdminModal'
import AddCategoryForm from './AddCategoryForm'

const ManageCategoriesHeader = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    return (
        <div className="p-6">
          {/* Header Area */}
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-xl font-semibold">Manage Categories</h2>
              <p className="text-sm text-gray-500">Organize content and products with categories</p>
            </div>
            <button 
              onClick={toggleModal}
              className="bg-[#213721] w-[140px] h-[40px] text-white px-4 py-2 rounded-md hover:bg-green-700 text-sm font-semibold"
            >
              + Add Category
            </button>
          </div>

          {/* Add Category Modal */}
          <AdminModal isOpen={isModalOpen} onClose={toggleModal}>
            <AddCategoryForm onClose={toggleModal} />
          </AdminModal>
        </div>
    )
}

export default ManageCategoriesHeader