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

module.exports = app;
