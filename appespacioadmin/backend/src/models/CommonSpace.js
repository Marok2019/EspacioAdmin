const mongoose = require('mongoose');

const commonSpaceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ['gym', 'salonEventos', 'canchaDeportes', 'quincho', 'cowork', 'estacionamientoVisitas'],
    required: true,
  },
  cost: {
    type: Number,
    required: true,
  },
  condominium: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Condominium',
    required: true,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('CommonSpace', commonSpaceSchema);
