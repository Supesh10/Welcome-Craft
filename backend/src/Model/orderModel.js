const mongoose = require('mongoose');

// Order Schema for managing customer orders
const orderSchema = new mongoose.Schema({
  customerName: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  email: { type: String, required: true },

  // Product reference and category reference
  product: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Product', 
    required: true 
  },
  productTitle: { type: String, required: true }, // Store product title for easy access
  productCategory: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Category', 
    required: true 
  },
  
  silvePriceAtOrder: { 
    type: Number, 
  }, // Silver price at the time of order


  // Quantity of product ordered
  quantity: { 
    type: Number, 
    required: true, 
    min: 1 
  },

  // Order status: 'pending', 'contacted', 'completed'
  status: { 
    type: String, 
    enum: ['pending', 'contacted', 'completed'], 
    default: 'pending' 
  }

}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);
