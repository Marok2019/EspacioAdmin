const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User' // Refiera al modelo de usuario si lo tienes
    },
    condominium: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Condominium' // Refiera al modelo de condominio si lo tienes
    },
    amount: {
        type: Number,
        required: true
    },
    cardNumber: {
        type: String,
        required: true
    },
    cvv: {
        type: String,
        required: true
    },
    expirationDate: {
        type: String,
        required: true
    },
    status: {
        type: String,
        default: 'completed', // o 'pending', dependiendo de tu flujo de pago
        enum: ['completed', 'failed', 'pending']
    },
}, {
    timestamps: true
});

module.exports = mongoose.model('Payment', paymentSchema);
