import React from 'react'

const ManageCategoriesHeader = () => {
    return (
        <div className="p-6">
          {/* Header Area */}
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-xl font-semibold">Manage Categories</h2>
              <p className="text-sm text-gray-500">Organize content and products with categories</p>
            </div>
            <button className="bg-[#213721] w-[140px] h-[40px] text-white px-4 py-2 rounded-md hover:bg-green-700 text-sm font-semibold">
              + Add Category
            </button>
          </div>
    </div>
  )
}

export default ManageCategoriesHeader