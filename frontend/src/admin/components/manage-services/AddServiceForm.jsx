import React, { useState } from 'react';
import { X } from 'lucide-react';
import { useAdminService } from '../../../context/admin/service/AdminServiceContext';

const AddServiceForm = ({ onClose }) => {
  const { createService } = useAdminService();
  const [formData, setFormData] = useState({
    title: '',
    tier: 'Basic',
    price: '',
    duration: '',
    description: '',
    audience: '1-on-1',
    isVideoAvailable: false
  });
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [validationErrors, setValidationErrors] = useState({});

  const validateFormData = () => {
    const errors = {};
    
    // String validations with trimming
    if (!formData.title || !formData.title.trim()) {
      errors.title = 'Title is required';
    }
    if (!formData.description || !formData.description.trim()) {
      errors.description = 'Description is required';
    }
    if (!formData.tier) {
      errors.tier = 'Tier is required';
    }
    if (!formData.audience || !formData.audience.trim()) {
      errors.audience = 'Audience is required';
    }
    
    // Number validations
    const price = parseFloat(formData.price);
    const duration = parseInt(formData.duration, 10);
    
    if (!formData.price || isNaN(price) || price <= 0) {
      errors.price = 'Price must be a valid number greater than 0';
    }
    if (!formData.duration || isNaN(duration) || duration <= 0) {
      errors.duration = 'Duration must be a valid number greater than 0';
    }
    
    // Image validation
    if (!imageFile) {
      errors.image = 'Image is required';
    } else if (!imageFile.type.startsWith('image/')) {
      errors.image = 'File must be an image';
    }

    console.log('Form validation results:', {
      formData,
      errors,
      hasErrors: Object.keys(errors).length > 0
    });

    return errors;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    // Handle different input types
    const newValue = type === 'checkbox' ? checked : value;
    
    setFormData(prev => {
      const newData = {
        ...prev,
        [name]: newValue
      };
      console.log('Form field updated:', {
        field: name,
        value: newValue,
        type: typeof newValue
      });
      return newData;
    });

    // Clear validation error when user starts typing
    if (validationErrors[name]) {
      setValidationErrors(prev => ({
        ...prev,
        [name]: null
      }));
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      console.log('Image selected:', {
        name: file.name,
        type: file.type,
        size: file.size
      });
      
      if (!file.type.startsWith('image/')) {
        setValidationErrors(prev => ({
          ...prev,
          image: 'Selected file must be an image'
        }));
        return;
      }
      
      setImageFile(file);
      // Clear validation error when user selects a valid file
      if (validationErrors.image) {
        setValidationErrors(prev => ({
          ...prev,
          image: null
        }));
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setValidationErrors({});

    console.log('Form submission started');
    console.log('Current form data:', formData);
    
    // Validate form data
    const errors = validateFormData();
    if (Object.keys(errors).length > 0) {
      console.log('Validation failed:', errors);
      setValidationErrors(errors);
      setError('Please fix the validation errors');
      return;
    }

    setLoading(true);
    try {
      // Create FormData object with proper type conversions
      const formDataToSend = new FormData();
      
      // Log raw form data before processing
      console.log('Processing form data:', {
        ...formData,
        image: imageFile ? {
          name: imageFile.name,
          type: imageFile.type,
          size: imageFile.size
        } : null
      });
      
      // String fields (trimmed)
      formDataToSend.append('title', formData.title.trim());
      formDataToSend.append('description', formData.description.trim());
      formDataToSend.append('tier', formData.tier);
      formDataToSend.append('audience', formData.audience.trim());
      
      // Number fields (converted)
      formDataToSend.append('price', parseFloat(formData.price));
      formDataToSend.append('duration', parseInt(formData.duration, 10));
      
      // Boolean field
      formDataToSend.append('isVideoAvailable', formData.isVideoAvailable.toString());
      
      // Image file
      if (imageFile) {
        formDataToSend.append('image', imageFile);
      }

      // Log the final form data being sent
      console.log('Sending form data:');
      for (let [key, value] of formDataToSend.entries()) {
        if (key === 'image') {
          console.log('image:', {
            name: value.name,
            type: value.type,
            size: value.size
          });
        } else {
          console.log(`${key}:`, value, `(${typeof value})`);
        }
      }

      const response = await createService(formDataToSend);
      console.log('Service created successfully:', response);
      onClose();
    } catch (err) {
      console.error('Service creation error:', {
        message: err.message,
        response: err.response?.data
      });
      
      if (err.response?.data?.errors) {
        setValidationErrors(err.response.data.errors);
        setError('Please fix the validation errors');
      } else {
        setError(err.response?.data?.message || 'Failed to create service');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 text-sm text-gray-700">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Add New Service</h2>
        <X size={24} onClick={onClose} className="text-red-500 cursor-pointer"/>
      </div>

      <div>
        <label htmlFor="title" className="block font-medium text-gray-700 mb-1">
          Service Title <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className={`mt-1 block w-full rounded-md border ${
            validationErrors.title ? 'border-red-500' : 'border-gray-300'
          } shadow-sm focus:border-green-800 focus:ring-green-800 py-2.5 px-3 text-sm`}
        />
        {validationErrors.title && (
          <p className="mt-1 text-sm text-red-600">{validationErrors.title}</p>
        )}
      </div>

      <div>
        <label htmlFor="tier" className="block font-medium text-gray-700 mb-1">
          Tier <span className="text-red-500">*</span>
        </label>
        <select
          id="tier"
          name="tier"
          value={formData.tier}
          onChange={handleChange}
          className={`mt-1 block w-full rounded-md border ${
            validationErrors.tier ? 'border-red-500' : 'border-gray-300'
          } shadow-sm focus:border-green-800 focus:ring-green-800 py-2.5 px-3 text-sm`}
        >
          <option value="Basic">Basic</option>
          <option value="Premium">Premium</option>
          <option value="Professional">Professional</option>
        </select>
        {validationErrors.tier && (
          <p className="mt-1 text-sm text-red-600">{validationErrors.tier}</p>
        )}
      </div>

      <div>
        <label htmlFor="price" className="block font-medium text-gray-700 mb-1">
          Price ($) <span className="text-red-500">*</span>
        </label>
        <input
          type="number"
          id="price"
          name="price"
          value={formData.price}
          onChange={handleChange}
          min="0"
          step="0.01"
          className={`mt-1 block w-full rounded-md border ${
            validationErrors.price ? 'border-red-500' : 'border-gray-300'
          } shadow-sm focus:border-green-800 focus:ring-green-800 py-2.5 px-3 text-sm`}
        />
        {validationErrors.price && (
          <p className="mt-1 text-sm text-red-600">{validationErrors.price}</p>
        )}
      </div>

      <div>
        <label htmlFor="duration" className="block font-medium text-gray-700 mb-1">
          Duration (minutes) <span className="text-red-500">*</span>
        </label>
        <input
          type="number"
          id="duration"
          name="duration"
          value={formData.duration}
          onChange={handleChange}
          min="1"
          className={`mt-1 block w-full rounded-md border ${
            validationErrors.duration ? 'border-red-500' : 'border-gray-300'
          } shadow-sm focus:border-green-800 focus:ring-green-800 py-2.5 px-3 text-sm`}
        />
        {validationErrors.duration && (
          <p className="mt-1 text-sm text-red-600">{validationErrors.duration}</p>
        )}
      </div>

      <div>
        <label htmlFor="description" className="block font-medium text-gray-700 mb-1">
          Description <span className="text-red-500">*</span>
        </label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows="3"
          className={`mt-1 block w-full rounded-md border ${
            validationErrors.description ? 'border-red-500' : 'border-gray-300'
          } shadow-sm focus:border-green-800 focus:ring-green-800 py-2.5 px-3 text-sm`}
        />
        {validationErrors.description && (
          <p className="mt-1 text-sm text-red-600">{validationErrors.description}</p>
        )}
      </div>

      <div>
        <label htmlFor="audience" className="block font-medium text-gray-700 mb-1">
          Audience <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="audience"
          name="audience"
          value={formData.audience}
          onChange={handleChange}
          className={`mt-1 block w-full rounded-md border ${
            validationErrors.audience ? 'border-red-500' : 'border-gray-300'
          } shadow-sm focus:border-green-800 focus:ring-green-800 py-2.5 px-3 text-sm`}
        />
        {validationErrors.audience && (
          <p className="mt-1 text-sm text-red-600">{validationErrors.audience}</p>
        )}
      </div>

      <div>
        <label htmlFor="image" className="block font-medium text-gray-700 mb-1">
          Service Image <span className="text-red-500">*</span>
        </label>
        <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
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
                  onChange={handleImageChange}
                  className="sr-only"
                />
              </label>
              <p className="pl-1">or drag and drop</p>
            </div>
            <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
          </div>
        </div>
        {imageFile && (
          <p className="mt-2 text-sm text-gray-500">
            Selected file: {imageFile.name}
          </p>
        )}
        {validationErrors.image && (
          <p className="mt-1 text-sm text-red-600">{validationErrors.image}</p>
        )}
      </div>

      <div className="flex items-center">
        <input
          type="checkbox"
          id="isVideoAvailable"
          name="isVideoAvailable"
          checked={formData.isVideoAvailable}
          onChange={handleChange}
          className="h-4 w-4 rounded border-gray-300 text-green-800 focus:ring-green-800"
        />
        <label htmlFor="isVideoAvailable" className="ml-2 block text-sm text-gray-700">
          Video Available
        </label>
      </div>

      {error && (
        <div className="p-3 bg-red-100 text-red-700 rounded-md text-sm">
          {error}
        </div>
      )}

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
          disabled={loading}
          className="px-4 py-2 rounded-md bg-[#213721] text-white hover:bg-green-800 text-sm font-medium disabled:opacity-50"
        >
          {loading ? 'Creating...' : 'Create Service'}
        </button>
      </div>
    </form>
  );
};

export default AddServiceForm; 