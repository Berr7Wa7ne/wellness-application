import React from 'react';

export const ShippingTaxEstimator = () => {
  return (
    <div className="border border-gray-200 p-6">
      <h3 className="text-xl font-bold text-[#213721] mb-4">Estimate Shipping and Tax</h3>
      <p className="text-gray-600 text-sm mb-4">Enter your destination to get a shipping estimate.</p>
      <div className="space-y-4">
        <div>
          <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">Country</label>
          <select
            id="country"
            name="country"
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-[#617C5F] focus:border-[#617C5F] sm:text-sm rounded-md"
            defaultValue="Nigeria"
          >
            <option>Nigeria</option>
            {/* Add more countries as needed */}
          </select>
        </div>
        <div>
          <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">State/Province</label>
          <select
            id="state"
            name="state"
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-[#617C5F] focus:border-[#617C5F] sm:text-sm rounded-md"
            defaultValue=""
          >
            <option value="">Please select a region, state or pn</option>
            {/* Add more states/provinces as needed */}
          </select>
        </div>
        <div>
          <label htmlFor="zip" className="block text-sm font-medium text-gray-700 mb-1">Zip/Postal Code</label>
          <input
            type="text"
            id="zip"
            name="zip"
            className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md py-2 px-3"
          />
        </div>
        <div className="flex items-center">
          <input
            id="store-pickup"
            name="shipping-method"
            type="radio"
            className="focus:ring-[#617C5F] h-4 w-4 text-[#617C5F] border-gray-300"
            defaultChecked
          />
          <label htmlFor="store-pickup" className="ml-2 block text-sm text-gray-900">
            Store/PickUp: NGN 0.00
          </label>
        </div>
      </div>
    </div>
  );
}; 