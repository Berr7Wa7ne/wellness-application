// src/models/Product.js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    tier: { type: String, enum: ["Basic", "Pro", "Premium"], default: "Basic" },
    videoUrl: { type: String },
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Product", ProductSchema);
