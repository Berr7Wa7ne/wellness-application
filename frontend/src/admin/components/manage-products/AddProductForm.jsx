import React, { useState, useContext, useEffect } from 'react';
import { X, Upload, Image as ImageIcon } from 'lucide-react';
import { useAdminCategory } from '../../../context/admin/category/AdminCategoryContext';
import { useAdminTier } from '../../../context/admin/tier/AdminTierContext';
import { useAdminProduct } from '../../../context/admin/product/AdminProductContext';

const AddProductForm = ({ onClose, editingProduct = null }) => {
  const { categories, fetchCategories, categoriesLoading, categoriesError } = useAdminCategory();
  const { createProduct, updateProduct } = useAdminProduct();
  const { tiers, fetchTiers } = useAdminTier();
  // State for form fields
  const [name, setName] = useState(editingProduct?.name || '');
  const [category, setCategory] = useState(editingProduct?.category || '');
  const [tier, setTier] = useState(editingProduct?.tier || '');
  const [price, setPrice] = useState(editingProduct?.price || '');
  const [stock, setStock] = useState(editingProduct?.stock || '');
  const [description, setDescription] = useState(editingProduct?.description || '');
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(editingProduct?.imageUrl || null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    console.log('AddProductForm: Fetching categories...');
    fetchCategories();
  }, [fetchCategories]);

  useEffect(() => {
    fetchTiers();
  }, [fetchTiers]);

  useEffect(() => {
    console.log('AddProductForm: Categories updated:', categories);
  }, [categories]);

  useEffect(() => {
    return () => {
      if (previewUrl && previewUrl.startsWith('blob:')) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      if (previewUrl && previewUrl.startsWith('blob:')) {
        URL.revokeObjectURL(previewUrl);
      }
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Create FormData for file upload
      const formData = new FormData();
      formData.append('name', name);
      formData.append('category', category);
      formData.append('tier', tier);
      formData.append('price', price);
      formData.append('stock', stock || 0);
      formData.append('description', description);
      
      if (selectedFile) {
        formData.append('image', selectedFile);
      }

      // Debug: Log FormData contents
      console.log('=== FormData Debug ===');
      console.log('Form values:', { name, category, tier, price, stock, description });
      console.log('FormData entries:');
      for (let pair of formData.entries()) {
        console.log(pair[0] + ': ' + pair[1]);
      }

      console.log('Product Data:', {
        name,
        category,
        tier,
        price,
        stock: stock || 0,
        description,
        hasImage: !!selectedFile
      });

      if (editingProduct) {
        console.log('Editing product:', editingProduct);
        console.log('Editing product _id:', editingProduct._id);
        if (!editingProduct._id) {
          alert('Error: Product ID is missing!');
          setIsSubmitting(false);
          return;
        }
        await updateProduct(editingProduct._id, formData);
      } else {
        await createProduct(formData);
      }

      onClose();
    } catch (error) {
      console.error('Error saving product:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 text-sm text-gray-700">
      {/* Modal Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">
          {editingProduct ? 'Edit Product' : 'Add New Product'}
        </h2>
        <X size={24} onClick={onClose} className='text-red-500 cursor-pointer'/>
      </div>

      {/* Product Name */}
      <div>
        <label htmlFor="name" className="block font-medium text-gray-700 mb-1">Product Name</label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Enter product name"
          className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-green-800 focus:ring-green-800 py-2.5 px-3 text-sm"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>

      {/* Description */}
      <div>
        <label htmlFor="description" className="block font-medium text-gray-700 mb-1">Description</label>
        <textarea
          id="description"
          name="description"
          rows="3"
          placeholder="Enter product description"
          className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-green-800 focus:ring-green-800 py-2.5 px-3 text-sm"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
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
          disabled={categoriesLoading}
        >
          <option value="">
            {categoriesLoading ? 'Loading categories...' : 'Select a category'}
          </option>
          {categories && categories.length > 0 ? (
            categories.map(cat => (
              <option key={cat._id} value={cat.name}>{cat.name}</option>
            ))
          ) : (
            !categoriesLoading && <option value="" disabled>No categories available</option>
          )}
        </select>
        {categoriesError && (
          <p className="mt-1 text-sm text-red-600">{categoriesError}</p>
        )}
        {categories && categories.length === 0 && !categoriesLoading && (
          <p className="mt-1 text-sm text-gray-500">No categories found. Please add categories first.</p>
        )}
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
          {tiers.map(tierObj => (
            <option key={tierObj._id} value={tierObj._id}>
              {tierObj.name}
            </option>
          ))}
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

      {/* Image Upload */}
      <div>
        <label htmlFor="image" className="block font-medium text-gray-700 mb-1">
          Product Image 
          {!editingProduct && <span className="text-red-500">*</span>}
        </label>
        <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
          {previewUrl ? (
            <div className="flex flex-col items-center">
              <img
                src={previewUrl}
                alt="Preview"
                className="h-32 w-32 object-cover rounded border"
              />
              <button
                type="button"
                onClick={() => {
                  if (previewUrl && previewUrl.startsWith('blob:')) {
                    URL.revokeObjectURL(previewUrl);
                  }
                  setSelectedFile(null);
                  setPreviewUrl(null);
                }}
                className="mt-2 text-xs text-red-600 hover:underline"
              >
                Remove
              </button>
            </div>
          ) : (
            <div className="space-y-1 text-center">
              <svg
                className="mx-auto h-12 w-12 text-gray-400"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 48 48"
                aria-hidden="true"
              >
                <path
                  d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L40 32"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <div className="flex text-sm text-gray-600">
                <label
                  htmlFor="image-upload"
                  className="relative cursor-pointer bg-white rounded-md font-medium text-green-600 hover:text-green-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-green-500"
                >
                  <span>Upload a file</span>
                  <input
                    id="image-upload"
                    name="image"
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="sr-only"
                  />
                </label>
                <p className="pl-1">or drag and drop</p>
              </div>
              <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
            </div>
          )}
        </div>
        {selectedFile && (
          <div className="mt-2 text-sm text-gray-600">
            <p>Selected file: {selectedFile.name}</p>
            <p>Size: {(selectedFile.size / 1024 / 1024).toFixed(2)} MB</p>
          </div>
        )}
      </div>

      {/* Footer Buttons */}
      <div className="flex justify-end gap-3 pt-4">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-100 text-sm font-medium"
          disabled={isSubmitting}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 rounded-md bg-[#213721] text-white hover:bg-green-800 text-sm font-medium disabled:opacity-50"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Saving...' : (editingProduct ? 'Update Product' : 'Create Product')}
        </button>
      </div>
    </form>
  );
};

export default AddProductForm; 