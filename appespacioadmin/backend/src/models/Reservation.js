const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  commonSpace: {
    type: String,
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  reservedAt: { 
    type: Date,
    required: true,
    default: Date.now, 
  },
  condominium: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Condominium',
    required: true,
  },
});

const Reservation = mongoose.model('Reservation', reservationSchema);
module.exports = Reservation;
