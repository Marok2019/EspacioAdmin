const mongoose = require('mongoose');

const commonExpenseSchema = new mongoose.Schema(
  {
    condominiumId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Condominium',
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    month: {
      type: String,
      required: true,
    },
    year: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ['pending', 'paid', 'expired'],
      default: 'pending',
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Expense', commonExpenseSchema);
