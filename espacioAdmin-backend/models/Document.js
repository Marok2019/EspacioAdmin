const mongoose = require('mongoose');

const documentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    url: { type: String, required: true },
    condo: { type: mongoose.Schema.Types.ObjectId, ref: 'Condominium' }, // Relacionado con el condominio
    uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // El usuario que sube el documento
    type: { type: String, enum: ['contract', 'maintenance', 'commonExpense', 'other'], required: true },
});

const Document = mongoose.model('Document', documentSchema);
module.exports = Document;
