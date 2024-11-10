const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',  // Asegúrate de que 'User' es el nombre del modelo de usuario
    required: true
  },
  commonSpace: {
    type: String,  // O si estás utilizando un tipo diferente, ajústalo aquí
    enum: ['gym', 'cowork', 'quincho', 'estacionamientoVisitas', 'salonEventos', 'canchaDeportes'],
    required: true
  },
  reservedAt: {
    type: Date,
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Reservation', reservationSchema);
