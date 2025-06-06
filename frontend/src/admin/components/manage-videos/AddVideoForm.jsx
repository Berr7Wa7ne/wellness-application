import React, { useState } from 'react';
import { X } from 'lucide-react';

const AddVideoForm = ({ onClose }) => {

  return (
    <form>
      {/* Modal Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Add New Video</h2>
        <X size={24} onClick={onClose} className='text-red-500'/>
      </div>

      <p className="text-sm text-gray-600 mb-6">Upload a video file or add video details to your content library.</p>

      {/* Upload File Section */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">Upload File <span className="text-red-500">*</span></label>
        <div className="border-2 border-dashed border-gray-300 rounded-md p-6 text-center">
          <div className="mb-2">
            <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
              <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L40 32" />
            </svg>
          </div>
          <p className="mb-2 text-sm text-gray-600">Drag and drop your video, audio, or image file here</p>
          <p className="text-xs text-gray-500 mb-4">Supports: MP4, MOV, AVI, MP3, WAV, JPG, PNG, etc.</p>
          {/* Hidden file input to make upload required */}
          <input type="file" id="video-upload" name="video-upload" className="sr-only" required />
          <label htmlFor="video-upload" className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 cursor-pointer">
            Choose File
          </label>
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
        >
          <option value="">Select a category</option>
          {/* Add category options here */}
        </select>
      </div>

      {/* Duration (optional) */}
      <div className="mb-4">
        <label htmlFor="duration" className="block text-sm font-medium text-gray-700">Duration (optional)</label>
        <input
          type="text"
          name="duration"
          id="duration"
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          placeholder="e.g. 15:30"
        />
      </div>

      {/* Thumbnail URL (optional) */}
      <div className="mb-6">
        <label htmlFor="thumbnailUrl" className="block text-sm font-medium text-gray-700">Thumbnail URL (optional)</label>
        <input
          type="text"
          name="thumbnailUrl"
          id="thumbnailUrl"
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          placeholder="https://example.com/thumbnail.jpg"
        />
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
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-[#213721] hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#7fa876]"
        >
          Save
        </button>
      </div>
    </form>
  );
};

export default AddVideoForm; 