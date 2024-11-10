const mongoose = require('mongoose');

const condominiumSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  gym: {
    type: Boolean,
    default: false,
  },
  cowork: {
    type: Boolean,
    default: false,
  },
  quincho: {
    type: Boolean,
    default: false,
  },
  estacionamientoVisitas: {
    type: Boolean,
    default: false,
  },
  salonEventos: {
    type: Boolean,
    default: false,
  },
  canchaDeportes: {
    type: Boolean,
    default: false,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Condominium', condominiumSchema);
