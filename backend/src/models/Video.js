const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

const videoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    duration: {
        type: String,
        required: true,
        trim: true
    },
    status: {
        type: String,
        enum: ['Draft', 'Scheduled', 'Published'],
        default: 'Draft'
      },
    backgroundColor: { 
        type: String, 
        required: true 
      },
    textColor: { 
        type: String, 
        required: true 
    },
    published: {
        type: Date,
    },
    views: {
        type: Number,
        default: 0,
    },
    image: {
        filename: { type: String },
        path: { type: String },
        mimetype: { type: String }
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

// Add virtual field for image URL
videoSchema.virtual('imageUrl').get(function() {
    if (this.image && this.image.path) {
        console.log('=== Video Image URL Generation ===');
        console.log('Image path:', this.image.path);
        
        // If the path already starts with http(s), it's a Cloudinary URL - return as is
        if (this.image.path.startsWith('http')) {
            console.log('Using Cloudinary URL:', this.image.path);
            return this.image.path;
        }
        
        // Otherwise, it's a local file path - construct the full URL
        const baseUrl = process.env.BACKEND_URL || 'https://wellness-application.onrender.com';
        const cleanBaseUrl = baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl;
        const cleanPath = this.image.path.startsWith('/') ? this.image.path.slice(1) : this.image.path;
        const fullUrl = `${cleanBaseUrl}/${cleanPath}`;
        
        console.log('Generated local URL:', fullUrl);
        return fullUrl;
    }
    return null;
});
module.exports = mongoose.model('Video', videoSchema);

