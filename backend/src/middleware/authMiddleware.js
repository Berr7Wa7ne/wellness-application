// middleware/authMiddleware.js
const jwt = require("jsonwebtoken");
require("dotenv").config();

// General Authentication Middleware
const authenticate = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "Access denied. No token provided." });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        if (!decoded.userId || !decoded.role) {
            return res.status(400).json({ message: "Invalid token format." });
        }
        req.user = decoded;
        next();
    } catch (err) {
        console.error('Token verification failed:', err.message);
        res.status(400).json({ message: "Invalid token." });
    }
};

// Admin Authentication Middleware
const verifyAdmin = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "Access denied. No token provided." });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        console.log('Decoded token:', decoded); // Add logging
        
        if (!decoded.userId || !decoded.role) {
            return res.status(400).json({ message: "Invalid token format." });
        }
        
        // Check if the user is an admin
        if (decoded.role !== "admin") {
            console.log('Access denied: User is not an admin. Role:', decoded.role);
            return res.status(403).json({ message: "Access denied. Admins only." });
        }

        req.user = decoded;
        next();
    } catch (err) {
        console.error('Token verification failed:', err.message);
        res.status(400).json({ message: "Invalid token." });
    }
};

module.exports = { authenticate, verifyAdmin };
