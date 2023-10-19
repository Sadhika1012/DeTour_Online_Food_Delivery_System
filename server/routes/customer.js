// server.js or routes/customer.js

const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { verifyToken } = require('../middleware/middle.js');

router.get('/customer-profile', verifyToken, async (req, res) => {
  try {
    // Assuming you store user details in the User model
    const user = await User.findById(req.user.userId).select('-password'); // Exclude password
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    res.json(user);
  } catch (error) {
    console.error('Error fetching customer profile:', error);
    res.status(500).json({ error: 'An error occurred while fetching the customer profile.' });
  }
});

module.exports = router;
