import React, { useState } from 'react';
import { X } from 'lucide-react';

const AddCategoryForm = ({ onClose }) => {
  // State for form fields
  const [categoryName, setCategoryName] = useState('');
  const [type, setType] = useState('Products');
  const [description, setDescription] = useState('');
  const [icon, setIcon] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Gather form data
    const formData = {
      categoryName,
      type,
      description,
      icon
    };
    console.log('Category Data:', formData);
    // TODO: Implement API call to add category
    
    // Close the modal after submission (or based on API response)
    // onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 text-sm text-gray-700">
      {/* Modal Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Add New Category</h2>
        <X size={24} onClick={onClose} className='text-red-500 cursor-pointer'/>
      </div>

      {/* Category Name */}
      <div>
        <label htmlFor="categoryName" className="block font-medium text-gray-700 mb-1">Category Name</label>
        <input
          type="text"
          id="categoryName"
          name="categoryName"
          placeholder="e.g., Meditation Videos, Healing Tools"
          className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-green-800 focus:ring-green-800 py-2.5 px-3 text-sm"
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
          required
        />
      </div>

      {/* Type */}
      <div>
        <label htmlFor="type" className="block font-medium text-gray-700 mb-1">Type</label>
        <select
          id="type"
          name="type"
          className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-green-800 focus:ring-green-800 py-2.5 px-3 text-sm"
          value={type}
          onChange={(e) => setType(e.target.value)}
          required
        >
          <option value="Products">Products</option>
          <option value="Videos">Videos</option>
          <option value="Audio">Audio</option>
          <option value="Services">Services</option>
        </select>
      </div>

      {/* Description */}
      <div>
        <label htmlFor="description" className="block font-medium text-gray-700 mb-1">Description</label>
        <textarea
          id="description"
          name="description"
          rows="3"
          placeholder="Enter a brief description of the category"
          className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-green-800 focus:ring-green-800 py-2.5 px-3 text-sm"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>

      {/* Icon */}
      <div>
        <label htmlFor="icon" className="block font-medium text-gray-700 mb-1">Icon</label>
        <select
          id="icon"
          name="icon"
          className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-green-800 focus:ring-green-800 py-2.5 px-3 text-sm"
          value={icon}
          onChange={(e) => setIcon(e.target.value)}
          required
        >
          <option value="">Select an icon</option>
          <option value="Video">Video</option>
          <option value="AudioLines">Audio</option>
          <option value="BookOpenCheck">Book</option>
          <option value="FlaskConical">Flask</option>
          <option value="ShieldCheck">Shield</option>
          <option value="HeartHandshake">Heart</option>
        </select>
      </div>

      {/* Submit Button */}
      <div className="flex justify-end gap-2 mt-6">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 text-sm font-medium text-white bg-[#213721] rounded-md hover:bg-green-800"
        >
          Create Category
        </button>
      </div>
    </form>
  );
};

export default AddCategoryForm; 