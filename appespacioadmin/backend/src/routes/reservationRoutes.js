const express = require('express');
const { 
  createReservation, 
  getReservations, 
  getReservationById, 
  updateReservation, 
  deleteReservation, 
  deleteAllReservations 
} = require('../controllers/reservationController');
const router = express.Router();

// Ruta para crear una nueva reserva
router.post('/create', createReservation);

// Ruta para obtener todas las reservas
router.get('/', getReservations);

// Ruta para obtener una reserva por ID
router.get('/:id', getReservationById);

// Ruta para actualizar una reserva
router.put('/:id', updateReservation);

// Ruta para eliminar una reserva
router.delete('/:id', deleteReservation);

// Ruta para eliminar todas las reservas
router.delete('/deleteAll', deleteAllReservations);

module.exports = router;
