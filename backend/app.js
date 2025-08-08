const express = require('express');
const connectDB = require("./src/utils/db");
const cors = require('cors');
const multer = require('multer');
require('dotenv').config();

// Debug environment variables
console.log('=== Server Startup Environment Variables ===');
console.log('STORAGE_TYPE:', process.env.STORAGE_TYPE);
console.log('NODE_ENV:', process.env.NODE_ENV);
console.log('BACKEND_URL:', process.env.BACKEND_URL);
console.log('CLOUDINARY_CLOUD_NAME:', process.env.CLOUDINARY_CLOUD_NAME ? 'SET' : 'NOT SET');
console.log('CLOUDINARY_API_KEY:', process.env.CLOUDINARY_API_KEY ? 'SET' : 'NOT SET');
console.log('CLOUDINARY_API_SECRET:', process.env.CLOUDINARY_API_SECRET ? 'SET' : 'NOT SET');

const path = require('path');
const authRoutes = require('./src/routes/public/authRoutes');
const videoRoutes = require('./src/routes/public/videoRoutes');
const videoAdminRoutes = require('./src/routes/admin/videoAdminRoutes')
const serviceRoutes = require('./src/routes/public/serviceRoutes');
const serviceAdminRoutes = require('./src/routes/admin/serviceAdminRoutes');
const productRoutes = require('./src/routes/public/productRoutes');
const productAdminRoutes = require("./src/routes/admin/productAdminRoutes");
const categoryAdminRoutes = require('./src/routes/admin/categoryAdminRoutes');
const tierAdminRoutes = require('./src/routes/admin/tierAdminRoutes');
const tierRoutes =  require('./src/routes/public/tierRoutes');
const cartRoutes = require('./src/routes/public/cartRoutes');
const profileRoutes = require('./src/routes/public/profileRoutes');
const dashboardRoutes = require('./src/routes/admin/dashboardRoutes');
const adminProfileRoutes = require('./src/routes/admin/profileRoutes');
const notificationRoutes = require('./src/routes/admin/notificationRoutes');
const categoryRoutes = require('./src/routes/public/categoryRoutes');
const paymentRoutes = require('./src/routes/public/paymentRoutes');

const { AppError } = require('./src/utils/errorHandler');

const app = express();

// // Configure multer for file uploads
// const storage = multer.memoryStorage();
// const upload = multer({ 
//   storage: storage,
//   limits: {
//     fileSize: 10 * 1024 * 1024, // 10MB limit
//   },
//   fileFilter: (req, file, cb) => {
//     // Accept images only
//     if (file.mimetype.startsWith('image/')) {
//       cb(null, true);
//     } else {
//       cb(new Error('Only image files are allowed!'), false);
//     }
//   }
// });

app.use(cors({
    origin: function (origin, callback) {
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin) return callback(null, true);
        
        const allowedOrigins = [
            "http://localhost:5173",
            "http://localhost:3000",
            "https://wellness-application.vercel.app",
            "https://wellness-application-git-main-wellness-application.vercel.app"
        ];
        
        console.log('CORS check - Origin:', origin);
        console.log('CORS check - Allowed origins:', allowedOrigins);
        
        if (allowedOrigins.indexOf(origin) !== -1) {
            console.log('CORS check - Origin allowed');
            callback(null, true);
        } else {
            console.log('CORS check - Origin blocked:', origin);
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept'],
    credentials: true,
    preflightContinue: false,
    optionsSuccessStatus: 204
}));

// Handle preflight requests
app.options('*', cors());

// Add request logging middleware
app.use((req, res, next) => {
    console.log(`${req.method} ${req.path} - Origin: ${req.headers.origin || 'No origin'}`);
    next();
});

app.use(express.json());

console.log('Serving uploads from:', path.join(__dirname, 'uploads'));

// Serve static files from the uploads directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

console.log('BACKEND_URL:', process.env.BACKEND_URL);

console.log('Stripe key loaded:', process.env.STRIPE_SECRET_KEY ? 'Yes' : 'No');

connectDB();

app.use('/public', paymentRoutes);
// Routes
app.use('/auth', authRoutes);

// Public routes
app.use('/public', videoRoutes);
app.use('/public', serviceRoutes);
app.use('/public', productRoutes);
app.use('/public', categoryRoutes);
app.use('/public', tierRoutes);
app.use('/public', cartRoutes);
app.use('/public', profileRoutes);

// Admin routes
app.use('/admin', videoAdminRoutes);
app.use('/admin', serviceAdminRoutes);
app.use('/admin', productAdminRoutes);
app.use('/admin', categoryAdminRoutes);
app.use('/admin', tierAdminRoutes);
app.use('/admin', dashboardRoutes);
app.use('/admin', adminProfileRoutes);  
app.use('/admin', notificationRoutes);


// Global error handler
app.use((err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (process.env.NODE_ENV === 'development') {
    res.status(err.statusCode).json({
      success: false,
      error: err,
      message: err.message,
      stack: err.stack
    });
  } else {
    // Production mode
    if (err.isOperational) {
      res.status(err.statusCode).json({
        success: false,
        message: err.message
      });
    } else {
      // Programming or unknown errors
      console.error('ERROR 💥', err);
      res.status(500).json({
        success: false,
        message: 'Something went wrong'
      });
    }
  }
});

module.exports = app;
