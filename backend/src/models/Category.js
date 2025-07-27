const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CategorySchema = new Schema({
    name: { type: String, required: true, unique: true },
    description: { type: String },
    type: { type: String, default: 'Products' },
    backgroundColor: { type: String, required: true }, // e.g., "bg-purple-100"
    textColor: { type: String, required: true },      // e.g., "text-purple-800"
    items: { type: Number, default: 0 },              // Track number of items in category
    image: {
        filename: String,
        path: String,
        contentType: String
    },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

// Add virtual field for image URL
CategorySchema.virtual('imageUrl').get(function() {
    if (this.image && this.image.path) {
        console.log('=== Category Image URL Generation ===');
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

// Update timestamp on save
CategorySchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
});

module.exports = mongoose.model("Category", CategorySchema);
