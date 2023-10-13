// models/Order.js

const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  items: [
    {
      name: String,
      quantity: Number,
      price: Number,
    }
  ],
  totalAmount: Number,
  createdAt: Date,
});

module.exports = mongoose.model('Order', orderSchema);
