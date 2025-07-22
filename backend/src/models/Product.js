// src/models/Product.js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const slugify = require('slugify')
const fs = require('fs');
const path = require('path');

const ProductSchema = new Schema({
    name: { 
        type: String, 
        required: true,
        trim: true
    },
    description: { 
        type: String, 
        required: true
    },
    price: { 
        type: Number, 
        required: true
    },
    category: {
        type: String,
        required: true
    },
    tier: { type: Schema.Types.ObjectId, ref: 'Tier', required: true },
    stock: { 
        type: Number,
        default: 0
    },
    image: {
        filename: String,
        path: String,
        contentType: String
    },
    createdAt: { 
        type: Date, 
        default: Date.now 
    },
    slug: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
      },
    updatedAt: { 
        type: Date,
        default: Date.now
    }
}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

ProductSchema.pre('validate', function(next) {
    if (this.name && !this.slug) {
      this.slug = slugify(this.name, { lower: true, strict: true });
    }
    next();
  });

// Add virtual field for image URL
ProductSchema.virtual('imageUrl').get(function() {
    if (this.image && this.image.path) {
        console.log('=== Product Image URL Generation ===');
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
ProductSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
});

module.exports = mongoose.model("Product", ProductSchema);
