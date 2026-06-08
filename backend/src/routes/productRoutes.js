const express = require('express');
const router = express.Router();
const { getProducts, getProductById, createProduct, addReview } = require('../controllers/productController');
const { protect } = require('../middleware/authMiddleware');

router.get('/',           getProducts);
router.get('/:id',        getProductById);
router.post('/',          protect, createProduct);
router.post('/:id/review', protect, addReview);

module.exports = router;
