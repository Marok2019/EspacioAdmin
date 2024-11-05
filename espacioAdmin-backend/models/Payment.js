const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  rut: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  expense: { type: mongoose.Schema.Types.ObjectId, ref: 'CommonExpense', required: true },
  amount: { type: Number, required: true },
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Payment', paymentSchema);
