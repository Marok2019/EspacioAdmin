const mongoose = require('mongoose');

const commonSpaceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ['Estacionamiento', 'Quincho', 'Multicancha', 'Sala de Eventos', 'Gym', 'Cowork', 'CanchaDeportes'],
    required: true,
  },
  available: {
    type: Boolean,
    default: true,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('CommonSpace', commonSpaceSchema);
