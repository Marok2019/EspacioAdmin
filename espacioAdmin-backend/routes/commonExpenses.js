const express = require('express');
const CommonExpense = require('../models/CommonExpense');
const router = express.Router();

// Crear un nuevo gasto común
router.post('/create', async (req, res) => {
    try {
        const { name, amount, condo, dueDate } = req.body;
        const newExpense = new CommonExpense({ name, amount, condo, dueDate });
        await newExpense.save();
        res.status(201).json({ message: 'Gasto común creado exitosamente' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Obtener los gastos comunes de un condominio
router.get('/condo/:condoId', async (req, res) => {
    try {
        const expenses = await CommonExpense.find({ condo: req.params.condoId });
        res.status(200).json(expenses);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Marcar un gasto común como pagado
router.put('/:id/pay', async (req, res) => {
    try {
        const expense = await CommonExpense.findByIdAndUpdate(req.params.id, { paid: true }, { new: true });
        if (!expense) return res.status(404).json({ message: 'Gasto no encontrado' });
        res.status(200).json(expense);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
