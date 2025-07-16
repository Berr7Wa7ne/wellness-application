const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const fs = require('fs');
const path = require('path');

const ServiceSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    duration: { type: Number, required: true },
    tier: { type: Schema.Types.ObjectId, ref: 'Tier', required: true },
    price: { type: Number, required: true },
    audience: { type: String, required: true },
    isVideoAvailable: { type: Boolean, default: false },
    image: {
        filename: { type: String },
        path: { type: String },
        mimetype: { type: String }
    },
    createdAt: { type: Date, default: Date.now },
}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

// Add virtual field for image URL
ServiceSchema.virtual('imageUrl').get(function() {
    if (this.image && this.image.path) {
        console.log('=== Service Image URL Generation ===');
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

module.exports = mongoose.model("Service", ServiceSchema);
