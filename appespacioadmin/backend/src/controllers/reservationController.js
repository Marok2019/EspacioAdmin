const Reservation = require('../models/Reservation');

// Crear una reserva
exports.createReservation = async (req, res) => {
  const { user, space, reservedAt } = req.body;
  try {
    const reservation = new Reservation({ user, space, reservedAt });
    await reservation.save();
    res.status(201).json({ reservation });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
