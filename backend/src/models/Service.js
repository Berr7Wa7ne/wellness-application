const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const fs = require('fs');
const path = require('path');

const ServiceSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    duration: { type: Number, required: true },
    tier: { type: String, required: true },
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
        // Convert Windows path separators to forward slashes for URLs
        const normalizedPath = this.image.path.replace(/\\/g, '/');
        
        console.log('=== Image URL Generation ===');
        console.log('Original path:', this.image.path);
        console.log('Normalized path:', normalizedPath);

        // If the path already starts with http(s), return it as is
        if (normalizedPath.startsWith('http')) {
            console.log('Using full URL from path:', normalizedPath);
            return normalizedPath;
        }

        // Try to check if file exists locally
        const absolutePath = path.join(__dirname, '../../', normalizedPath);
        const fileExistsLocally = fs.existsSync(absolutePath);
        console.log('Checking local file:', absolutePath);
        console.log('File exists locally:', fileExistsLocally);

        // Use local URL if file exists, otherwise use deployed URL
        const baseUrl = fileExistsLocally 
            ? 'http://localhost:5000'
            : (process.env.BACKEND_URL || 'https://wellness-application.onrender.com');

        console.log('Selected base URL:', baseUrl);
        
        // Remove any trailing slash from backend URL
        const cleanBaseUrl = baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl;
        
        // Remove any leading slash from path
        const cleanPath = normalizedPath.startsWith('/') ? normalizedPath.slice(1) : normalizedPath;
        
        const fullUrl = `${cleanBaseUrl}/${cleanPath}`;
        console.log('Generated full URL:', fullUrl);
        
        return fullUrl;
    }
    return null;
});

module.exports = mongoose.model("Service", ServiceSchema);
