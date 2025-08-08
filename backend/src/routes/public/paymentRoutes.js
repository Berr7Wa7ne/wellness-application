// backend/src/routes/public/paymentRoutes.js
const express = require('express');
const router = express.Router();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// Add CORS headers specifically for this route if needed
router.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', req.headers.origin);
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With, Accept');
  res.header('Access-Control-Allow-Credentials', true);
  next();
});

// Make sure this route is BEFORE any authentication middleware
router.post('/create-payment-intent', async (req, res) => {
  console.log('Payment intent route hit!', req.body);
  console.log('Request headers:', req.headers);
  
  const { amount, currency = 'usd' } = req.body;
  
  // Validate required fields
  if (!amount || amount <= 0) {
    return res.status(400).json({ error: 'Valid amount is required' });
  }
  
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Stripe expects cents
      currency: currency.toLowerCase(),
      automatic_payment_methods: {
        enabled: true,
      },
    });
    
    console.log('Payment intent created successfully:', paymentIntent.id);
    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (err) {
    console.error('Stripe error:', err);
    res.status(500).json({ error: err.message });
  }
});

// If you have other routes that need authentication, put them AFTER this one
// router.use(authMiddleware); // Apply auth middleware to routes below

module.exports = router;