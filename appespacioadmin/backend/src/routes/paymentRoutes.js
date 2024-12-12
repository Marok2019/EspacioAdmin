const express = require('express');
const router = express.Router();
const Payment = require('../models/Payment'); // Ruta correcta según tu estructura de carpetas

// Algoritmo de Luhn para validar el número de tarjeta
function validateCardNumber(cardNumber) {
    let sum = 0;
    let shouldDouble = false;

    // Recorremos el número de derecha a izquierda
    for (let i = cardNumber.length - 1; i >= 0; i--) {
        let digit = parseInt(cardNumber.charAt(i));

        if (shouldDouble) {
            digit *= 2;
            if (digit > 9) {
                digit -= 9; // Sumar los dígitos si el número es mayor que 9
            }
        }

        sum += digit;
        shouldDouble = !shouldDouble;
    }

    return sum % 10 === 0;
}

// Validación básica de la tarjeta
function validateCard(cardNumber, cvv) {
    const visaRegex = /^4/; // Visa empieza con 4
    const mastercardRegex = /^5[1-5]/; // MasterCard empieza con 51-55
    const amexRegex = /^3[47]/; // American Express empieza con 34 o 37
    const discoverRegex = /^6/; // Discover empieza con 6

    let cardType = '';
    let cardLength = cardNumber.length;

    // Determinamos el tipo de tarjeta y la longitud correcta
    if (visaRegex.test(cardNumber)) {
        cardType = 'Visa';
        if (cardLength !== 13 && cardLength !== 16) return { valid: false, message: 'Visa requiere una longitud de 13 o 16 dígitos.' };
    } else if (mastercardRegex.test(cardNumber)) {
        cardType = 'MasterCard';
        if (cardLength !== 16) return { valid: false, message: 'MasterCard requiere una longitud de 16 dígitos.' };
    } else if (amexRegex.test(cardNumber)) {
        cardType = 'American Express';
        if (cardLength !== 15) return { valid: false, message: 'American Express requiere una longitud de 15 dígitos.' };
    } else if (discoverRegex.test(cardNumber)) {
        cardType = 'Discover';
        if (cardLength !== 16) return { valid: false, message: 'Discover requiere una longitud de 16 dígitos.' };
    } else {
        return { valid: false, message: 'Tipo de tarjeta no reconocido. Solo Visa, MasterCard, American Express y Discover son soportadas.' };
    }

    // Validamos que el número de la tarjeta sea correcto usando el algoritmo de Luhn
    if (!validateCardNumber(cardNumber)) {
        return { valid: false, message: 'Número de tarjeta inválido según el algoritmo de Luhn.' };
    }

    // Validación del CVV según el tipo de tarjeta
    if (cardType === 'American Express' && cvv.length !== 4) {
        return { valid: false, message: 'El CVV de American Express debe tener 4 dígitos.' };
    } else if ((cardType === 'Visa' || cardType === 'MasterCard' || cardType === 'Discover') && cvv.length !== 3) {
        return { valid: false, message: 'El CVV de Visa, MasterCard o Discover debe tener 3 dígitos.' };
    }

    return { valid: true };
}

// Ruta de pago mockup
router.post('/', async (req, res) => {
    const { userId, condominium, amount, cardNumber, cvv, expirationDate } = req.body;

    // Verificar si faltan datos
    if (!userId || !condominium || !amount || !cardNumber || !cvv || !expirationDate) {
        return res.status(400).json({ message: 'Faltan datos para procesar el pago.' });
    }

    // Validar la tarjeta
    const cardValidation = validateCard(cardNumber, cvv);
    if (!cardValidation.valid) {
        return res.status(400).json({ message: cardValidation.message });
    }

    try {
        // Si todos los datos son correctos, creamos el objeto Payment
        const payment = new Payment({
            userId,
            condominium,
            amount,
            cardNumber,
            cvv,
            expirationDate,
            status: 'completed'  // Puedes establecer el estado como 'completed' para simular un pago exitoso
        });

        // Guardamos el pago en la base de datos
        await payment.save();

        return res.status(201).json({ message: 'Pago procesado exitosamente', payment });  // Devolvemos el pago creado
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error al procesar el pago y guardarlo en la base de datos' });
    }
});

// Obtener todos los pagos (GET)
router.get('/', async (req, res) => {
    try {
        const payments = await Payment.find();
        res.status(200).json(payments);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener los pagos' });
    }
});

module.exports = router;