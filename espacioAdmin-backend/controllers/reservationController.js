// controllers/reservationController.js
const Reservation = require('../models/Reservation');

// Crear una nueva reserva
exports.createReservation = async (req, res) => {
  try {
    const reservation = new Reservation(req.body);
    await reservation.save();
    res.status(201).json({ message: 'Reserva creada exitosamente', reservation });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Obtener todas las reservas
exports.getAllReservations = async (req, res) => {
  try {
    const reservations = await Reservation.find().populate('user condominium');
    res.status(200).json({ reservations });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Obtener reservas por usuario
exports.getReservationsByUser = async (req, res) => {
  try {
    const reservations = await Reservation.find({ user: req.params.userId }).populate('condominium');
    res.status(200).json({ reservations });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Obtener reservas por condominio
exports.getReservationsByCondominium = async (req, res) => {
  try {
    const reservations = await Reservation.find({ condominium: req.params.condominiumId }).populate('user');
    res.status(200).json({ reservations });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Obtener una reserva por ID
exports.getReservationById = async (req, res) => {
  try {
    const reservation = await Reservation.findById(req.params.id).populate('user condominium');
    if (!reservation) {
      return res.status(404).json({ error: 'Reserva no encontrada' });
    }
    res.status(200).json({ reservation });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Eliminar una reserva
exports.deleteReservation = async (req, res) => {
  try {
    const reservation = await Reservation.findByIdAndDelete(req.params.id);
    if (!reservation) {
      return res.status(404).json({ error: 'Reserva no encontrada' });
    }
    res.status(200).json({ message: 'Reserva eliminada exitosamente' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Actualizar una reserva
exports.updateReservation = async (req, res) => {
  try {
    const reservation = await Reservation.findByIdAndUpdate(req.params.id, req.body, { new: true }).populate('user condominium');
    if (!reservation) {
      return res.status(404).json({ error: 'Reserva no encontrada' });
    }
    res.status(200).json({ message: 'Reserva actualizada exitosamente', reservation });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

