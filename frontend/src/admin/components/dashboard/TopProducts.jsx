import React from 'react';
import { Package } from 'lucide-react';

const TopProducts = ({ products, loading, error }) => {
  if (loading) {
    return <div className="bg-white rounded-lg p-4 shadow-sm w-full">Loading top products...</div>;
  }
  if (error) {
    return <div className="bg-white rounded-lg p-4 shadow-sm w-full text-red-500">{error}</div>;
  }
  if (!products) {
    return null;
  }
  return (
    <div className="bg-white rounded-lg p-4 shadow-sm w-full">
      <div className="flex items-center justify-between mb-1">
        <div className="flex items-center justify-between gap-80">
          <h2 className="text-lg font-semibold">Top Products</h2>
          <Package className="w-5 h-5 text-gray-400" />
        </div>
      </div>
      <p className="text-sm text-gray-500 mb-4">Best selling products this month</p>
      <ul className="space-y-3">
        {products.map((product, i) => (
          <li key={i} className="flex items-center justify-between">
            <div className="flex space-x-2 items-start min-w-[120px]">
              <span className="w-6 h-6 bg-[#213721] text-white text-sm border rounded-sm flex items-center justify-center mb-1">{i + 1}</span>
              <span className="font-medium">{product.name}</span>
            </div>
            <div className="flex flex-col items-end">
              <span className="font-semibold">{product.value?.toLocaleString?.() ?? product.value}</span>
              {/* You can add changeType and change if backend provides it */}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TopProducts;