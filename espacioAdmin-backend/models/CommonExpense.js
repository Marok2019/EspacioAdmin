const mongoose = require('mongoose');

const commonExpenseSchema = new mongoose.Schema({
    rut: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    amount: { type: Number, required: true },
    condo: { type: mongoose.Schema.Types.ObjectId, ref: 'Condominium' },
    paid: { type: Boolean, default: false },
    dueDate: { type: Date, required: true },
});

const CommonExpense = mongoose.model('CommonExpense', commonExpenseSchema);
module.exports = CommonExpense;
