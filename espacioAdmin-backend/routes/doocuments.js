const express = require('express');
const Document = require('../models/Document');
const router = express.Router();

// Crear un documento
router.post('/create', async (req, res) => {
    try {
        const { name, url, condo, uploadedBy, type } = req.body;
        const newDocument = new Document({ name, url, condo, uploadedBy, type });
        await newDocument.save();
        res.status(201).json({ message: 'Documento subido exitosamente' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Obtener documentos de un condominio específico
router.get('/condo/:condoId', async (req, res) => {
    try {
        const documents = await Document.find({ condo: req.params.condoId });
        res.status(200).json(documents);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
