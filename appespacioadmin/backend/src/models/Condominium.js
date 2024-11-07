const mongoose = require('mongoose');

// Definir el esquema de espacios comunes dentro del condominio
const commonSpaceSchema = new mongoose.Schema({
  name: { type: String, required: true }, // Ej: 'Quincho 1', 'Estacionamiento A'
  type: { 
    type: String, 
    enum: ['Estacionamiento', 'Quincho', 'Multicancha', 'Sala de Eventos', 'Gym', 'Cowork'], 
    required: true 
  },
  available: { type: Boolean, default: true },
});

// Definir el esquema del condominio que contiene los espacios comunes
const condominiumSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  commonSpaces: [commonSpaceSchema], // Lista de espacios comunes específicos en el condominio
}, {
  timestamps: true,
});

module.exports = mongoose.model('Condominium', condominiumSchema);
