const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('./cloudinary');

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'wellness-app', // You can change this folder name
    allowed_formats: ['jpg', 'jpeg', 'png', 'gif'],
  },
});

module.exports = storage;