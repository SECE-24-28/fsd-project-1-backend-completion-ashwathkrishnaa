const Order = require('../models/Order');

const createOrder = async (req, res) => {
  try {
    const { items, shippingAddress, paymentMethod, subtotal, shippingCharge, discount, totalAmount } = req.body;
    const order = await Order.create({
      user: req.user._id, items, shippingAddress,
      paymentMethod, subtotal, shippingCharge, discount, totalAmount
    });
    res.status(201).json(order);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate('user', 'name email');
    if (!order) return res.status(404).json({ message: 'Order not found' });
    res.json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateOrderStatus = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: 'Order not found' });
    order.orderStatus = req.body.orderStatus;
    if (req.body.orderStatus === 'delivered') order.deliveredAt = Date.now();
    await order.save();
    res.json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { createOrder, getMyOrders, getOrderById, updateOrderStatus };
