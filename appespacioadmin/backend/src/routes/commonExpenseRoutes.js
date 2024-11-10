const express = require('express');
const router = express.Router();
const commonExpenseController = require('../controllers/commonExpenseController');


router.post('/', commonExpenseController.createExpense);
router.get('/', commonExpenseController.getAllExpenses);
router.get('/:id', commonExpenseController.getExpenseById);
router.put('/:id', commonExpenseController.updateExpense);
router.delete('/:id', commonExpenseController.deleteExpense);
router.delete('/', commonExpenseController.deleteAllExpenses);  // Ruta para eliminar todos los gastos comunes


module.exports = router;
