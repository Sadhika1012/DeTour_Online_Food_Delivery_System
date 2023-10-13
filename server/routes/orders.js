const express = require('express');
const router = express.Router();
const Order = require('../models/Order');

router.use(express.json());

router.post("/", async (req, res) => {
    try {
        const orderDetails = req.body;
        const newOrder = new Order(orderDetails);
      
        await newOrder.save();
      
        res.status(200).json({ message: 'Order placed successfully!' });
    } catch (error) {
        console.error('Error placing order:', error);
        res.status(500).json({ error: 'An error occurred while placing the order.' });
    }
});

module.exports = router;
