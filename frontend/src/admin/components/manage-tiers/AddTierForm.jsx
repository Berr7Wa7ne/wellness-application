import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { useAdminTier } from '../../../context/admin/tier/AdminTierContext';

const AddTierForm = ({ onClose, editingTier }) => {
  // Predefined badge colors
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

  // State for form fields
  const [tierName, setTierName] = useState(editingTier?.name || '');
  const [price, setPrice] = useState(editingTier?.price || '');
  const [period, setPeriod] = useState(editingTier?.period || 'month');
  const [features, setFeatures] = useState(editingTier?.features || ['']);
  const [isActive, setIsActive] = useState(
    editingTier?.isActive !== undefined ? editingTier.isActive : true
  );
  const [selectedColor, setSelectedColor] = useState(
    editingTier ? { bg: editingTier.backgroundColor, text: editingTier.textColor } : predefinedColors[0]
  );

  const { createTier, updateTier, tiersLoading, tiersError } = useAdminTier();
  const [localError, setLocalError] = useState(null);

  useEffect(() => {
    if (editingTier) {
      setTierName(editingTier.name || '');
      setPrice(editingTier.price || '');
      setPeriod(editingTier.period || 'month');
      setFeatures(editingTier.features || ['']);
      setIsActive(editingTier.isActive !== undefined ? editingTier.isActive : true);
      setSelectedColor({ bg: editingTier.backgroundColor, text: editingTier.textColor });
    } else {
      setTierName('');
      setPrice('');
      setPeriod('month');
      setFeatures(['']);
      setIsActive(true);
      setSelectedColor(predefinedColors[0]);
    }
  }, [editingTier]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLocalError(null);
    const formData = {
      tierName,
      backgroundColor: selectedColor.bg,
      textColor: selectedColor.text,
      price,
      period,
      features: features.filter(feature => feature.trim() !== ''),
      isActive
    };
    try {
      if (editingTier && editingTier._id) {
        await updateTier(editingTier._id, formData);
      } else {
        await createTier(formData);
      }
      onClose();
    } catch (err) {
      setLocalError(err?.message || 'Failed to save tier');
    }
  };

  const addFeature = () => {
    setFeatures([...features, '']);
  };

  const removeFeature = (index) => {
    setFeatures(features.filter((_, i) => i !== index));
  };

  const updateFeature = (index, value) => {
    const newFeatures = [...features];
    newFeatures[index] = value;
    setFeatures(newFeatures);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 text-sm text-gray-700">
      {/* Modal Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">{editingTier ? 'Edit Tier' : 'Add New Tier'}</h2>
        <X size={24} onClick={onClose} className='text-red-500 cursor-pointer'/>
      </div>

      {/* Error Message */}
      {(localError || tiersError) && (
        <div className="text-red-500 text-sm mb-2">{localError || tiersError}</div>
      )}

      {/* Tier Name */}
      <div>
        <label htmlFor="tierName" className="block font-medium text-gray-700 mb-1">Tier Name</label>
        <input
          type="text"
          id="tierName"
          name="tierName"
          placeholder="e.g., Basic, Premium, Professional"
          className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-green-800 focus:ring-green-800 py-2.5 px-3 text-sm"
          value={tierName}
          onChange={(e) => setTierName(e.target.value)}
          required
        />
      </div>

      {/* Price */}
      <div>
        <label htmlFor="price" className="block font-medium text-gray-700 mb-1">Price</label>
        <div className="flex gap-2">
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
          <select
            id="period"
            name="period"
            className="mt-1 block w-32 rounded-md border border-gray-300 shadow-sm focus:border-green-800 focus:ring-green-800 py-2.5 px-3 text-sm"
            value={period}
            onChange={(e) => setPeriod(e.target.value)}
          >
            <option value="month">/month</option>
            <option value="year">/year</option>
          </select>
        </div>
      </div>

      {/* Features */}
      <div>
        <label className="block font-medium text-gray-700 mb-1">Features</label>
        {features.map((feature, index) => (
          <div key={index} className="flex gap-2 mb-2">
            <input
              type="text"
              placeholder="Enter feature"
              className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-green-800 focus:ring-green-800 py-2.5 px-3 text-sm"
              value={feature}
              onChange={(e) => updateFeature(index, e.target.value)}
            />
            {features.length > 1 && (
              <button
                type="button"
                onClick={() => removeFeature(index)}
                className="mt-1 px-3 py-2 text-red-500 hover:text-red-700"
              >
                <X size={20} />
              </button>
            )}
          </div>
        ))}
        <button
          type="button"
          onClick={addFeature}
          className="mt-2 text-sm text-green-600 hover:text-green-700"
        >
          + Add Feature
        </button>
      </div>

      {/* Active Status */}
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="isActive"
          name="isActive"
          className="rounded border-gray-300 text-green-800 focus:ring-green-800"
          checked={isActive}
          onChange={(e) => setIsActive(e.target.checked)}
        />
        <label htmlFor="isActive" className="text-sm text-gray-700">Active</label>
      </div>

      {/* Badge Color Selection */}
      <div>
        <label className="block font-medium text-gray-700 mb-2">
          Tier Badge Color
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

      {/* Badge Preview */}
      <div className="mt-4">
        <label className="block font-medium text-gray-700 mb-2">Preview</label>
        <div className="p-4 border rounded-md">
          <span
            className="px-3 py-1.5 rounded-full text-sm font-medium inline-block"
            style={{ backgroundColor: selectedColor.bg, color: selectedColor.text }}
          >
            {tierName || 'Tier Preview'}
          </span>
        </div>
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
          disabled={tiersLoading}
        >
          {tiersLoading ? (editingTier ? 'Updating...' : 'Creating...') : (editingTier ? 'Update Tier' : 'Create Tier')}
        </button>
      </div>
    </form>
  );
};

export default AddTierForm; 