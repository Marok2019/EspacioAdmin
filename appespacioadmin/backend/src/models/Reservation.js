const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  space: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'CommonSpace',
    required: true,
  },
  reservedAt: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'canceled'],
    default: 'pending',
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Reservation', reservationSchema);
