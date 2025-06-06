import React, { useState } from 'react';
import { X } from 'lucide-react';

const AddProductForm = ({ onClose }) => {
  // State for form fields
  const [productName, setProductName] = useState('');
  const [category, setCategory] = useState('');
  const [tier, setTier] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Gather form data
    const formData = {
      productName,
      category,
      tier,
      price,
      stock,
      imageUrl,
    };
    console.log('Product Data:', formData);
    // TODO: Implement API call to add product
    
    // Close the modal after submission (or based on API response)
    // onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 text-sm text-gray-700">
      {/* Modal Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Add New Product</h2>
        <X size={24} onClick={onClose} className='text-red-500'/>
      </div>

      {/* Product Name */}
      <div>
        <label htmlFor="productName" className="block font-medium text-gray-700 mb-1">Product Name</label>
        <input
          type="text"
          id="productName"
          name="productName"
          placeholder="Enter product name"
          className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-green-800 focus:ring-green-800 py-2.5 px-3 text-sm"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          required
        />
      </div>

      {/* Category Dropdown */}
      <div>
        <label htmlFor="category" className="block font-medium text-gray-700 mb-1">Category</label>
        <select
          id="category"
          name="category"
          className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-green-800 focus:ring-green-800 py-2.5 px-3 text-sm"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        >
          <option value="">Select a category</option>
          {/* Add category options dynamically */}
        </select>
      </div>

      {/* Tier Dropdown */}
      <div>
        <label htmlFor="tier" className="block font-medium text-gray-700 mb-1">Tier</label>
        <select
          id="tier"
          name="tier"
          className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-green-800 focus:ring-green-800 py-2.5 px-3 text-sm"
          value={tier}
          onChange={(e) => setTier(e.target.value)}
          required
        >
          <option value="">Select a tier</option>
          {/* Add tier options dynamically */}
        </select>
      </div>

      {/* Price */}
      <div>
        <label htmlFor="price" className="block font-medium text-gray-700 mb-1">Price</label>
        <input
          type="number"
          id="price"
          name="price"
          step="0.01"
          placeholder="29.99"
          className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-green-800 focus:ring-green-800 py-2.5 px-3 text-sm"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
      </div>

      {/* Stock */}
      <div>
        <label htmlFor="stock" className="block font-medium text-gray-700 mb-1">Stock <span className="text-gray-400">(leave empty for digital)</span></label>
        <input
          type="number"
          id="stock"
          name="stock"
          placeholder="50"
          className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-green-800 focus:ring-green-800 py-2.5 px-3 text-sm"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
        />
      </div>

      {/* Image URL */}
      <div>
        <label htmlFor="imageUrl" className="block font-medium text-gray-700 mb-1">Image URL <span className="text-gray-400">(optional)</span></label>
        <input
          type="url"
          id="imageUrl"
          name="imageUrl"
          placeholder="https://example.com/image.jpg"
          className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-green-800 focus:ring-green-800 py-2.5 px-3 text-sm"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
        />
      </div>
      

      {/* Footer Buttons */}
      <div className="flex justify-end gap-3 pt-4">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-100 text-sm font-medium"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 rounded-md bg-[#213721] text-white hover:bg-green-800 text-sm font-medium"
        >
          Save
        </button>
      </div>
    </form>
  );
};

export default AddProductForm; 