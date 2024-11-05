const Payment = require('../models/Payment');

exports.createPayment = async (req, res) => {
  const { user, expense, amount } = req.body;
  try {
    const payment = await Payment.create({ user, expense, amount });
    res.status(201).json(payment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
