const express = require('express');
const router = express.Router();
const { getProfile, updateProfile, addAddress, deleteAddress, toggleWishlist } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

router.get('/profile',                    protect, getProfile);
router.put('/profile',                    protect, updateProfile);
router.post('/address',                   protect, addAddress);
router.delete('/address/:addrId',         protect, deleteAddress);
router.put('/wishlist/:productId',        protect, toggleWishlist);

module.exports = router;
