const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const User = require('../models/User');

// Cart is stored client-side (localStorage) in this project.
// These endpoints are placeholders for future server-side cart sync.

router.get('/', protect, async (req, res) => {
  res.json({ message: 'Cart is managed client-side via localStorage', cart: [] });
});

router.post('/sync', protect, async (req, res) => {
  // Future: sync client cart with DB
  res.json({ message: 'Cart synced', cart: req.body.cart || [] });
});

module.exports = router;
