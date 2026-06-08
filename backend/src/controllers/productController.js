const Product = require('../models/Product');

const getProducts = async (req, res) => {
  try {
    const { category, subcategory, search, sort, minPrice, maxPrice } = req.query;
    const filter = {};
    if (category)    filter.category = category;
    if (subcategory) filter.subcategory = subcategory;
    if (search)      filter.name = { $regex: search, $options: 'i' };
    if (minPrice || maxPrice)
      filter.price = { ...(minPrice && { $gte: Number(minPrice) }), ...(maxPrice && { $lte: Number(maxPrice) }) };

    const sortOptions = {
      'price-asc': { price: 1 }, 'price-desc': { price: -1 },
      'rating': { rating: -1 }, 'newest': { createdAt: -1 }
    };

    const products = await Product.find(filter).sort(sortOptions[sort] || { createdAt: -1 });
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const createProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const addReview = async (req, res) => {
  try {
    const { rating, comment } = req.body;
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    product.reviews.push({ user: req.user._id, name: req.user.name, rating, comment });
    product.numReviews = product.reviews.length;
    product.rating = product.reviews.reduce((s, r) => s + r.rating, 0) / product.numReviews;
    await product.save();
    res.status(201).json({ message: 'Review added' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getProducts, getProductById, createProduct, addReview };
