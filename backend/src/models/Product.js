const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  user:    { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  name:    String,
  rating:  { type: Number, required: true, min: 1, max: 5 },
  comment: String,
}, { timestamps: true });

const productSchema = new mongoose.Schema({
  name:          { type: String, required: true },
  description:   { type: String, required: true },
  price:         { type: Number, required: true },
  originalPrice: { type: Number },
  category:      { type: String, enum: ['men', 'women', 'kids'], required: true },
  subcategory:   { type: String, required: true },
  badge:         { type: String, default: '' },
  images:        [String],
  sizes:         [String],
  colors:        [String],
  stock:         { type: Number, default: 0 },
  reviews:       [reviewSchema],
  rating:        { type: Number, default: 0 },
  numReviews:    { type: Number, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
