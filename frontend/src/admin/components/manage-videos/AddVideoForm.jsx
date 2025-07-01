import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { useAdminVideo } from '../../../context/admin/video/AdminVideoContext';
import { useAdminCategory } from '../../../context/admin/category/AdminCategoryContext';

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

const AddVideoForm = ({ onClose, editingVideo = null }) => {
  const { categories, fetchCategories, categoriesLoading } = useAdminCategory();
  const { createVideo, updateVideo } = useAdminVideo();

  const [title, setTitle] = useState(editingVideo?.title || '');
  const [category, setCategory] = useState(
    editingVideo
      ? (typeof editingVideo.category === 'object'
          ? editingVideo.category._id
          : editingVideo.category)
      : ''
  );
  const [duration, setDuration] = useState(editingVideo?.duration || '');
  const [status, setStatus] = useState(editingVideo?.status || 'Draft');
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(
    editingVideo?.imageUrl || null
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedColor, setSelectedColor] = useState(
    editingVideo 
        ? { bg: editingVideo.backgroundColor, text: editingVideo.textColor }
        : predefinedColors[0]
);

const [publishedDate, setPublishedDate] = useState(
  editingVideo?.published && editingVideo.status === 'Scheduled'
    ? new Date(editingVideo.published).toISOString().slice(0, 16)
    : ''
);

  useEffect(() => { fetchCategories(); }, [fetchCategories]);
  useEffect(() => () => { if (previewUrl && previewUrl.startsWith('blob:')) URL.revokeObjectURL(previewUrl); }, [previewUrl]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      if (previewUrl && previewUrl.startsWith('blob:')) URL.revokeObjectURL(previewUrl);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    if (previewUrl && previewUrl.startsWith('blob:')) URL.revokeObjectURL(previewUrl);
    setPreviewUrl(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const formData = new FormData();
    formData.append('title', title);
    formData.append('category', category);
    formData.append('duration', duration);
    formData.append('status', status);
    formData.append('backgroundColor', selectedColor.bg);
    formData.append('textColor', selectedColor.text);
    if (status === 'Scheduled' && publishedDate) {
      formData.append('published', new Date(publishedDate).toISOString());
    }
    if (selectedFile) formData.append('file', selectedFile);
    if (editingVideo) {
      await updateVideo(editingVideo._id, formData);
    } else {
      await createVideo(formData);
    }
    setIsSubmitting(false);
    onClose();
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Modal Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">{editingVideo ? 'Edit Video' : 'Add New Video'}</h2>
        <X size={24} onClick={onClose} className='text-red-500 cursor-pointer'/>
      </div>
      <p className="text-sm text-gray-600 mb-6">Upload a video file or add video details to your content library.</p>
      {/* Upload File Section */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">Upload File <span className="text-red-500">*</span></label>
        <div className="border-2 border-dashed border-gray-300 rounded-md p-6 text-center">
          {previewUrl ? (
            <div className="mb-2 flex flex-col items-center">
              {selectedFile && selectedFile.type.startsWith('video') ? (
                <video src={previewUrl} controls className="w-40 h-24 object-cover rounded mb-2" />
              ) : (
                <img src={previewUrl} alt="Preview" className="w-40 h-24 object-cover rounded mb-2" />
              )}
              <button type="button" onClick={handleRemoveFile} className="text-xs text-red-600 underline">Remove</button>
            </div>
          ) : (
            <>
              <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L40 32" />
              </svg>
              <p className="mb-2 text-sm text-gray-600">Drag and drop your video, audio, or image file here</p>
              <p className="text-xs text-gray-500 mb-4">Supports: MP4, MOV, AVI, MP3, WAV, JPG, PNG, etc.</p>
              <input type="file" id="video-upload" name="video-upload" className="sr-only" onChange={handleFileChange} accept="video/*,image/*,audio/*" />
              <label htmlFor="video-upload" className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 cursor-pointer">
                Choose File
              </label>
            </>
          )}
        </div>
      </div>
      {/* Title */}
      <div className="mb-4">
        <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
        <input
          type="text"
          name="title"
          id="title"
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          placeholder="Enter video title"
          value={title}
          onChange={e => setTitle(e.target.value)}
          required
        />
      </div>
      {/* Category */}
      <div className="mb-4">
        <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
        <select
          id="category"
          required
          name="category"
          className="mt-1 block w-full pl-3 pr-10 py-2 text-base shadow-sm border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
          value={category}
          onChange={e => setCategory(e.target.value)}
          disabled={categoriesLoading}
        >
          <option value="">{categoriesLoading ? 'Loading categories...' : 'Select a category'}</option>
          {categories && categories.length > 0 && categories.map(cat => (
            <option key={cat._id} value={cat._id}>{cat.name}</option>
          ))}
        </select>
      </div>
      {/* Duration*/}
      <div className="mb-4">
        <label htmlFor="duration" className="block text-sm font-medium text-gray-700">Duration</label>
        <input
          type="text"
          name="duration"
          id="duration"
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          placeholder="e.g. 15:30"
          value={duration}
          onChange={e => setDuration(e.target.value)}
        />
      </div>
      {/* Status Dropdown */}
      <div className="mb-4">
        <label htmlFor="status" className="block text-sm font-medium text-gray-700">Status</label>
        <select
          id="status"
          name="status"
          className="mt-1 block w-full pl-3 pr-10 py-2 text-base shadow-sm border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
          value={status}
          onChange={e => setStatus(e.target.value)}
        >
          <option value="Draft">Draft</option>
          <option value="Published">Published</option>
          <option value="Scheduled">Scheduled</option>
        </select>
      </div>
      {/* Date Picker for Scheduled Status */}
      {status === 'Scheduled' && (
        <div className="mb-4">
          <label htmlFor="publishedDate" className="block text-sm font-medium text-gray-700">
            Schedule Date & Time
          </label>
          <input
            type="datetime-local"
            id="publishedDate"
            name="publishedDate"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            value={publishedDate}
            onChange={e => setPublishedDate(e.target.value)}
            required
          />
        </div>
      )}
      {/* Color Selection */}
<div className="mb-4">
  <label className="block font-medium text-gray-700 mb-2">
    Status Badge Color
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
<div className="mb-4">
  <label className="block font-medium text-gray-700 mb-2">Badge Preview</label>
  <div className="p-4 border rounded-md">
    <span
      className="px-3 py-1.5 rounded-full text-sm font-medium inline-block"
      style={{
        backgroundColor: selectedColor.bg,
        color: selectedColor.text
      }}
    >
      {status || 'Status'}
    </span>
  </div>
</div>
      {/* Action Buttons */}
      <div className="flex justify-end">
        <button
          type="button"
          onClick={onClose}
          className="mr-2 inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-[#213721] hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#7fa876]"
        >
          {isSubmitting ? 'Saving...' : 'Save'}
        </button>
      </div>
    </form>
  );
};

export default AddVideoForm; 