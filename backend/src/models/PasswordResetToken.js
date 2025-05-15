// models/PasswordResetToken.js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PasswordResetTokenSchema = new Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    token: { type: String, required: true },
    createdAt: { type: Date, default: Date.now, expires: 3600 }, // 1 hour expiry
});

module.exports = mongoose.model("PasswordResetToken", PasswordResetTokenSchema);
