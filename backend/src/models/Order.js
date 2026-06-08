const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items: [
    {
      product:  { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
      name:     String,
      image:    String,
      price:    Number,
      size:     String,
      quantity: { type: Number, default: 1 }
    }
  ],
  shippingAddress: {
    fullName: String,
    phone:    String,
    line1:    String,
    city:     String,
    state:    String,
    pincode:  String
  },
  paymentMethod:  { type: String, required: true },
  paymentStatus:  { type: String, enum: ['pending','paid','failed'], default: 'pending' },
  orderStatus:    { type: String, enum: ['ordered','packed','shipped','out_for_delivery','delivered','cancelled'], default: 'ordered' },
  subtotal:       Number,
  shippingCharge: { type: Number, default: 0 },
  discount:       { type: Number, default: 0 },
  totalAmount:    Number,
  deliveredAt:    Date,
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);
