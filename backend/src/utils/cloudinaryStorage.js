const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('./cloudinary');

console.log('Cloudinary storage initialized for uploads');

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'wellness-app', // You can change this folder name
    allowed_formats: ['jpg', 'jpeg', 'png', 'gif'],
  },
});

module.exports = storage;