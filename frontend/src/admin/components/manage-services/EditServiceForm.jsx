import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { useAdminService } from '../../../context/admin/service/AdminServiceContext';
import { useAdminTier } from '../../../context/admin/tier/AdminTierContext';

const EditServiceForm = ({ service, onClose }) => {
  const { updateService } = useAdminService();
  const [formData, setFormData] = useState({
    title: service.title || '',
    tier: service.tier || 'Basic',
    price: service.price || '',
    duration: service.duration || '',
    description: service.description || '',
    audience: service.audience || '1-on-1',
    isVideoAvailable: service.isVideoAvailable || false
  });
  const [imageFile, setImageFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(service.imageUrl || null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [validationErrors, setValidationErrors] = useState({});
  const { tiers, fetchTiers } = useAdminTier();

  useEffect(() => {
    fetchTiers();
  }, [fetchTiers]);

  // Cleanup preview URL when component unmounts
  useEffect(() => {
    return () => {
      if (previewUrl && previewUrl.startsWith('blob:')) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

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
      
      // Create preview URL for the new image
      if (previewUrl && previewUrl.startsWith('blob:')) {
        URL.revokeObjectURL(previewUrl);
      }
      setPreviewUrl(URL.createObjectURL(file));
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
      
      // Image file - only append if a new image is selected
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

      const response = await updateService(service._id, formDataToSend);
      console.log('Service updated successfully:', response);
      onClose();
    } catch (err) {
      console.error('Service update error:', {
        message: err.message,
        response: err.response?.data
      });
      
      if (err.response?.data?.errors) {
        setValidationErrors(err.response.data.errors);
        setError('Please fix the validation errors');
      } else {
        setError(err.response?.data?.message || 'Failed to update service');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-900">Edit Service</h2>
        <button
          type="button"
          onClick={onClose}
          className="text-gray-400 hover:text-gray-500"
        >
          <X size={24} />
        </button>
      </div>

      {error && (
        <div className="bg-red-50 text-red-500 px-4 py-2 rounded-md text-sm">
          {error}
        </div>
      )}

      <div>
        <label htmlFor="title" className="block font-medium text-gray-700 mb-1">
          Title <span className="text-red-500">*</span>
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
        <label htmlFor="description" className="block font-medium text-gray-700 mb-1">
          Description <span className="text-red-500">*</span>
        </label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows={4}
          className={`mt-1 block w-full rounded-md border ${
            validationErrors.description ? 'border-red-500' : 'border-gray-300'
          } shadow-sm focus:border-green-800 focus:ring-green-800 py-2.5 px-3 text-sm`}
        />
        {validationErrors.description && (
          <p className="mt-1 text-sm text-red-600">{validationErrors.description}</p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
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
            step="0.01"
            min="0"
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
            Duration (mins) <span className="text-red-500">*</span>
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
        className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-green-800 focus:ring-green-800 py-2.5 px-3 text-sm"
        required
      >
        <option value="">Select a tier</option>
        {tiers.map(tier => (
          <option key={tier._id} value={tier._id}>
            {tier.name}
          </option>
        ))}
      </select>
        {validationErrors.tier && (
          <p className="mt-1 text-sm text-red-600">{validationErrors.tier}</p>
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
          Service Image
        </label>
        <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
          <div className="space-y-1 text-center">
            {previewUrl ? (
              <div className="relative">
                <img
                  src={previewUrl}
                  alt="Service preview"
                  className="mx-auto h-32 w-32 object-cover mb-4"
                />
                <button
                  type="button"
                  onClick={() => {
                    if (previewUrl.startsWith('blob:')) {
                      URL.revokeObjectURL(previewUrl);
                    }
                    setPreviewUrl(null);
                    setImageFile(null);
                  }}
                  className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1 transform translate-x-1/2 -translate-y-1/2 hover:bg-red-600"
                >
                  <X size={14} />
                </button>
              </div>
            ) : (
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
            )}
            <div className="flex text-sm text-gray-600">
              <label
                htmlFor="image-upload"
                className="relative cursor-pointer bg-white rounded-md font-medium text-green-600 hover:text-green-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-green-500"
              >
                <span>Upload a new image</span>
                <input
                  id="image-upload"
                  name="image"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="sr-only"
                />
              </label>
            </div>
            <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
          </div>
        </div>
        {imageFile && (
          <p className="mt-2 text-sm text-gray-500">
            Selected new image: {imageFile.name}
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
          className="h-4 w-4 text-green-800 focus:ring-green-800 border-gray-300 rounded"
        />
        <label htmlFor="isVideoAvailable" className="ml-2 block text-sm text-gray-900">
          Video Available
        </label>
      </div>

      <div className="flex justify-end gap-3">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#213721] hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-800 disabled:opacity-50"
        >
          {loading ? 'Saving...' : 'Save Changes'}
        </button>
      </div>
    </form>
  );
};

export default EditServiceForm; 