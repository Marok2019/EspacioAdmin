// routes/reservationRoutes.js
const express = require('express');
const router = express.Router();
const reservationController = require('../controllers/reservationController');
const { authMiddleware, isUser } = require('../middleware/authMiddleware');  // Importación correcta

// Rutas de reservas
router.post('/create', authMiddleware, isUser, reservationController.createReservation);
router.get('/condominium/:condominiumId', authMiddleware, isUser, reservationController.getReservationsByCondominium);
router.get('/:id', authMiddleware, isUser, reservationController.getReservationById);
router.put('/:id', authMiddleware, isUser, reservationController.updateReservation);
router.delete('/:id', authMiddleware, isUser, reservationController.deleteReservation);

module.exports = router;
