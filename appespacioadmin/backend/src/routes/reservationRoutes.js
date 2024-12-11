const express = require('express');
const router = express.Router();
const reservationController = require('../controllers/reservationController');

// Ruta para crear una reserva
router.post('/', reservationController.createReservation);

// Ruta para obtener todas las reservas
router.get('/', reservationController.getReservations);

// Ruta para obtener una reserva por ID
router.get('/:id', reservationController.getReservationById);

// Ruta para actualizar una reserva
router.put('/:id', reservationController.updateReservation);

// Ruta para eliminar una reserva
router.delete('/:id', reservationController.deleteReservation);

// Ruta para eliminar todas las reservas
router.delete('/', reservationController.deleteAllReservations);

// Ruta para obtener reservas filtradas
router.get('/filtered', reservationController.getFilteredReservations);

module.exports = router;