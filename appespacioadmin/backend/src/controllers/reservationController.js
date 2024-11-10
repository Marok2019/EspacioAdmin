const Reservation = require('../models/Reservation');

// Crear una reserva
exports.createReservation = async (req, res) => {
  const { userId, commonSpaceId, reservedAt } = req.body;

  try {
    const existingReservation = await Reservation.findOne({ commonSpace: commonSpaceId, reservedAt });
    if (existingReservation) {
      return res.status(400).json({ message: 'Ya existe una reserva para este espacio en esa fecha y hora' });
    }

    const reservation = new Reservation({
      user: userId,
      commonSpace: commonSpaceId,
      reservedAt,
    });

    await reservation.save();
    res.status(201).json(reservation);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obtener todas las reservas
exports.getReservations = async (req, res) => {
  try {
    const reservations = await Reservation.find();
    res.json(reservations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obtener una reserva por ID
exports.getReservationById = async (req, res) => {
  try {
    const reservation = await Reservation.findById(req.params.id);
    if (!reservation) {
      return res.status(404).json({ message: 'Reserva no encontrada' });
    }
    res.json(reservation);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Actualizar una reserva
exports.updateReservation = async (req, res) => {
  const { commonSpace, reservedAt } = req.body; // Aseguramos que también se puedan actualizar otros campos

  try {
    const reservation = await Reservation.findById(req.params.id);
    if (!reservation) {
      return res.status(404).json({ message: 'Reserva no encontrada' });
    }

    // Actualizar los campos que se pasen en el cuerpo de la solicitud
    if (commonSpace) reservation.commonSpace = commonSpace;
    if (reservedAt) reservation.reservedAt = reservedAt;

    await reservation.save();
    res.json(reservation);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Eliminar una reserva
exports.deleteReservation = async (req, res) => {
  try {
    const reservation = await Reservation.findById(req.params.id);
    if (!reservation) {
      return res.status(404).json({ message: 'Reserva no encontrada' });
    }

    await Reservation.deleteOne({ _id: req.params.id });
    res.json({ message: 'Reserva eliminada con éxito' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
