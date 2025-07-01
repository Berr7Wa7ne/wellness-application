const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["user", "admin"], default: "user" },
    phone: { type: String },
    bio: { type: String },
    profilePhoto: { type: String },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

UserSchema.virtual('profilePhotoUrl').get(function () {
    if (this.profilePhoto) {
        if (this.profilePhoto.startsWith('http')) return this.profilePhoto;
        return `${process.env.BACKEND_URL || 'http://localhost:5000'}${this.profilePhoto}`;
    }
    return null;
});

UserSchema.set('toJSON', { virtuals: true });
UserSchema.set('toObject', { virtuals: true });

// Use a consistent model name
const User = mongoose.model("User", UserSchema);
module.exports = User;
