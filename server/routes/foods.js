const express = require('express');
const router = express.Router();
const Food = require('../models/Food');

router.get('/food', async (req, res) => {
  try {
    const foodItems = await Food.find({});
    res.json(foodItems);
  } catch (error) {
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
