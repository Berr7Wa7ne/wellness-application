const mongoose = require("mongoose");

const TierSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true }, // tierName in form
    price: { type: Number, required: true },
    period: { type: String, enum: ['month', 'year'], required: true },
    features: { type: [String], required: true },
    backgroundColor: { type: String, required: true }, // e.g., "bg-purple-100"
    textColor: { type: String, required: true },      // e.g., "text-purple-800"
    isActive: { type: Boolean, default: true, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Tier", TierSchema);
