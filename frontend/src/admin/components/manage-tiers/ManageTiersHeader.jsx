import React from 'react'

const ManageTiersHeader = () => {
    return (
        <div className="p-6">
          {/* Header Area */}
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-xl font-semibold">Manage Tiers</h2>
              <p className="text-sm text-gray-500">Configure subscription tiers and pricing options</p>
            </div>
            <button className="bg-[#213721] w-[135px] h-[40px] text-white px-4 py-2 rounded-md hover:bg-green-700 text-sm font-semibold">
              + Add Tier
            </button>
          </div>
    </div>
  )
}

export default ManageTiersHeader