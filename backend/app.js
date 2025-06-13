const express = require('express');
const connectDB = require("./src/utils/db");
const cors = require('cors');
require('dotenv').config();
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

const { AppError } = require('./src/utils/errorHandler');



const app = express();

  app.use(cors({
    origin: [
        "http://localhost:5173",
        "https://wellness-application.vercel.app"
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));

app.options('*', cors());
app.use(express.json());

connectDB();

// Routes
app.use('/auth', authRoutes);
app.use('/public', videoRoutes);
app.use('/admin', videoAdminRoutes);
app.use('/public', serviceRoutes);
app.use('/admin', serviceAdminRoutes);
app.use('/public', productRoutes);
app.use('/admin', productAdminRoutes);
app.use('/admin', categoryAdminRoutes);
app.use('/admin', tierAdminRoutes);
app.use('/public', tierRoutes);
app.use('/public', cartRoutes);
app.use('/public', profileRoutes);
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
