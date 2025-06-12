import React from 'react';

export const DiscountSection = () => {
  return (
    <div className="border border-gray-200 p-6 mt-8">
      <h3 className="text-xl font-bold text-[#213721] mb-4">Discount Code</h3>
      <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
        <input
          type="text"
          placeholder="Enter discount code"
          className="flex-grow shadow-sm sm:text-sm border-gray-300 rounded-md py-2 px-3"
        />
        <button
          className="bg-red-600 text-white py-2 px-4 rounded-none hover:bg-red-700 transition-colors duration-300"
        >
          Apply Discount
        </button>
      </div>
    </div>
  );
}; 