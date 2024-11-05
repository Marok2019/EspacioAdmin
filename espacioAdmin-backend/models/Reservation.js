// models/Reservation.js
const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
  condoId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Condominium',
    required: true,
  },
  space: {
    type: String,
    enum: ['Gym', 'Cowork', 'Quincho', 'EstacionamientoVisitas', 'SalonEventos', 'CanchaDeportes'],
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Reservation', reservationSchema);
