import React, { useState, useContext } from 'react';
import { X } from 'lucide-react';
import { AdminCategoryContext } from '../../../context/admin/category/AdminCategoryContext';

const predefinedColors = [
    { bg: '#FFE4E1', text: '#FF6B6B', name: 'Soft Red' },
    { bg: '#E0F2F1', text: '#26A69A', name: 'Teal' },
    { bg: '#E8F5E9', text: '#66BB6A', name: 'Green' },
    { bg: '#FFF3E0', text: '#FFA726', name: 'Orange' },
    { bg: '#E3F2FD', text: '#42A5F5', name: 'Blue' },
    { bg: '#F3E5F5', text: '#AB47BC', name: 'Purple' },
    { bg: '#FAFAFA', text: '#9E9E9E', name: 'Gray' },
    { bg: '#FFF8E1', text: '#FFA000', name: 'Amber' },
];

const AddCategoryForm = ({ onClose, editingCategory = null }) => {
    const { createCategory, updateCategory, categories, fetchCategories } = useContext(AdminCategoryContext);
    const [isSubmitting, setIsSubmitting] = useState(false);
    
    // State for form fields
    const [categoryName, setCategoryName] = useState(editingCategory?.name || '');
    const [type, setType] = useState(editingCategory?.type || 'Products');
    const [description, setDescription] = useState(editingCategory?.description || '');
    const [selectedColor, setSelectedColor] = useState(
        editingCategory 
            ? { bg: editingCategory.backgroundColor, text: editingCategory.textColor }
            : predefinedColors[0]
    );
    // State for image upload
    const [selectedImageFile, setSelectedImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState(editingCategory?.imageUrl || null);

    const handleImageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setSelectedImageFile(file);
            
            // Create preview URL
            const previewUrl = URL.createObjectURL(file);
            setImagePreview(previewUrl);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        
        try {
            const formData = new FormData();
            formData.append('name', categoryName);
            formData.append('description', description);
            formData.append('type', type);
            formData.append('backgroundColor', selectedColor.bg);
            formData.append('textColor', selectedColor.text);

            // Append image file if selected
            if (selectedImageFile) {
                formData.append('image', selectedImageFile);
            }
            
            if (editingCategory) {
                await updateCategory(editingCategory._id, formData);
            } else {
                await createCategory(formData);
            }

            await fetchCategories();
            console.log("Categories objects", categories);
            
            onClose();
        } catch (error) {
            console.error('Error saving category:', error);
            // You can add toast notification here
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} encType="multipart/form-data" className="space-y-4 text-sm text-gray-700">
            {/* Modal Header */}
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">
                    {editingCategory ? 'Edit Category' : 'Add New Category'}
                </h2>
                <X size={24} onClick={onClose} className='text-red-500 cursor-pointer'/>
            </div>

            {/* Category Name */}
            <div>
                <label htmlFor="categoryName" className="block font-medium text-gray-700 mb-1">
                    Category Name
                </label>
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
                <label htmlFor="description" className="block font-medium text-gray-700 mb-1">
                    Description
                </label>
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

            {/* Image Upload */}
            <div>
                <label className="block font-medium text-gray-700 mb-2">
                    Category Image
                </label>
                <input
                    type="file"
                    id="image"
                    name="image"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100"
                />
                {imagePreview && (
                    <div className="mt-2">
                        <p className="text-xs text-gray-500 mb-2">
                            {selectedImageFile ? `Selected: ${selectedImageFile.name}` : 'Current Image'}
                        </p>
                        <img src={imagePreview} alt="Preview" className="h-20 w-20 object-cover rounded border"/>
                    </div>
                )}
            </div>

            {/* Color Selection */}
            <div>
                <label className="block font-medium text-gray-700 mb-2">
                    Category Color
                </label>
                <div className="grid grid-cols-4 gap-2">
                    {predefinedColors.map((color, idx) => (
                        <button
                            key={idx}
                            type="button"
                            onClick={() => setSelectedColor(color)}
                            className={`p-2 rounded-md border-2 ${
                                selectedColor.bg === color.bg ? 'border-green-500' : 'border-transparent'
                            }`}
                        >
                            <div 
                                className="h-8 rounded flex items-center justify-center"
                                style={{ backgroundColor: color.bg, color: color.text }}
                            >
                                <span className="text-xs font-medium">Aa</span>
                            </div>
                            <span className="text-xs mt-1 block text-gray-500">{color.name}</span>
                        </button>
                    ))}
                </div>
            </div>

            {/* Preview */}
            <div className="mt-4">
                <label className="block font-medium text-gray-700 mb-2">Preview</label>
                <div className="p-4 border rounded-md">
                    <span
                        className="px-3 py-1.5 rounded-full text-sm font-medium inline-block"
                        style={{
                            backgroundColor: selectedColor.bg,
                            color: selectedColor.text
                        }}
                    >
                        {categoryName || 'Category Preview'}
                    </span>
                </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end gap-2 mt-6">
                <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                    disabled={isSubmitting}
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    className="px-4 py-2 text-sm font-medium text-white bg-[#213721] rounded-md hover:bg-green-800 disabled:opacity-50"
                    disabled={isSubmitting}
                >
                    {isSubmitting ? 'Saving...' : (editingCategory ? 'Update Category' : 'Create Category')}
                </button>
            </div>
        </form>
    );
};

export default AddCategoryForm;