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



const app = express();

app.use(cors());
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

module.exports = app;
