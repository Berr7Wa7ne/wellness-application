// src/models/Product.js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    name: { 
        type: String, 
        required: [true, 'Product name is required'],
        trim: true,
        minlength: [2, 'Product name must be at least 2 characters long'],
        maxlength: [100, 'Product name cannot exceed 100 characters']
    },
    description: { 
        type: String, 
        required: [true, 'Product description is required'],
        minlength: [10, 'Description must be at least 10 characters long']
    },
    price: { 
        type: Number, 
        required: [true, 'Price is required'],
        min: [0, 'Price cannot be negative']
    },
    category: {
        type: String,
        required: [true, 'Category is required'],
        enum: {
            values: ['Magickal Oils', 'Meditation Videos', 'Licenses', 'Audio Guides', 'Healing Tools', 'Books & Journals'],
            message: '{VALUE} is not a valid category'
        }
    },
    tier: { 
        type: String, 
        enum: {
            values: ['Basic', 'Pro', 'Premium'],
            message: '{VALUE} is not a valid tier'
        },
        required: [true, 'Tier is required']
    },
    stock: { 
        type: Number,
        default: 0,
        min: [0, 'Stock cannot be negative']
    },
    image: {
        filename: String,
        path: String,
        contentType: String
    },
    imageUrl: {
        type: String,
        required: [true, 'Product image is required']
    },
    createdAt: { 
        type: Date, 
        default: Date.now 
    },
    updatedAt: { 
        type: Date,
        default: Date.now
    }
});

// Update timestamp on save
ProductSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
});

module.exports = mongoose.model("Product", ProductSchema);
