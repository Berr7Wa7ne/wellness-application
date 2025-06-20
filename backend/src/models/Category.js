const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    description: { type: String },
    type: { type: String, default: 'Products' },
    backgroundColor: { type: String, required: true }, // e.g., "bg-purple-100"
    textColor: { type: String, required: true },      // e.g., "text-purple-800"
    items: { type: Number, default: 0 },              // Track number of items in category
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Category", CategorySchema);