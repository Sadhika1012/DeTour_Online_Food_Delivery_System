const mongoose = require('mongoose');
// Define a schema for your food items
const foodSchema = new mongoose.Schema({
    name: String,
    description: String,
    category: String, // Category of the food item
    price: Number,    // Price of the food item
    image: String,    // Image file name (assuming you're storing file name)
    quantity: Number, // Quantity of the food item
    imageData: String // Store image data as Base64 encoded string (optional)
  });
  
module.exports = mongoose.model('Food', foodSchema);