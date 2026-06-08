const User = require('../models/User');

const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password');
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const { name, mobile, gender } = req.body;
    if (name)   user.name = name;
    if (mobile) user.mobile = mobile;
    if (gender) user.gender = gender;
    if (req.body.password) user.password = req.body.password;
    await user.save();
    res.json({ _id: user._id, name: user.name, email: user.email });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const addAddress = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (req.body.isDefault) user.addresses.forEach(a => a.isDefault = false);
    user.addresses.push(req.body);
    await user.save();
    res.status(201).json(user.addresses);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deleteAddress = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    user.addresses = user.addresses.filter(a => a._id.toString() !== req.params.addrId);
    await user.save();
    res.json(user.addresses);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const toggleWishlist = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const pid = req.params.productId;
    const idx = user.wishlist.indexOf(pid);
    if (idx > -1) user.wishlist.splice(idx, 1);
    else user.wishlist.push(pid);
    await user.save();
    res.json(user.wishlist);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getProfile, updateProfile, addAddress, deleteAddress, toggleWishlist };
