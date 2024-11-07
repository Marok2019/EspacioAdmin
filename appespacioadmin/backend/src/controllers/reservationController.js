const Reservation = require('../models/Reservation');
const CommonSpace = require('../models/CommonSpace');
const Condominium = require('../models/Condominium');

// Crear una reserva
exports.createReservation = async (req, res) => {
  const { user, spaceId, reservedAt, condominiumId } = req.body;

  try {
    const condominium = await Condominium.findById(condominiumId);
    if (!condominium) {
      return res.status(404).json({ message: 'Condominio no encontrado' });
    }

    const commonSpace = await CommonSpace.findById(spaceId);
    if (!commonSpace) {
      return res.status(404).json({ message: 'Espacio común no encontrado' });
    }

    // Verificar que el espacio no esté ya reservado en la fecha solicitada
    const conflictingReservation = await Reservation.findOne({
      space: spaceId,
      reservedAt: reservedAt,
    });

    if (conflictingReservation) {
      return res.status(400).json({ message: 'Espacio ya reservado en esta fecha y hora' });
    }

    // Crear la nueva reserva
    const reservation = new Reservation({ user, space: spaceId, reservedAt });
    await reservation.save();
    res.status(201).json({ reservation });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obtener todas las reservas
exports.getReservations = async (req, res) => {
  try {
    const reservations = await Reservation.find().populate('user space');
    res.status(200).json({ reservations });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obtener una reserva por ID
exports.getReservationById = async (req, res) => {
  try {
    const reservation = await Reservation.findById(req.params.id).populate('user space');
    if (!reservation) {
      return res.status(404).json({ message: 'Reserva no encontrada' });
    }
    res.status(200).json({ reservation });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Actualizar una reserva
exports.updateReservation = async (req, res) => {
  const { user, spaceId, reservedAt, status } = req.body;

  try {
    const reservation = await Reservation.findById(req.params.id);
    if (!reservation) {
      return res.status(404).json({ message: 'Reserva no encontrada' });
    }

    // Si el espacio o la fecha cambian, verificar si ya está reservado
    if (spaceId && reservedAt) {
      const conflictingReservation = await Reservation.findOne({
        space: spaceId,
        reservedAt: reservedAt,
      });

      if (conflictingReservation && conflictingReservation._id.toString() !== reservation._id.toString()) {
        return res.status(400).json({ message: 'Espacio ya reservado en esta fecha y hora' });
      }
    }

    reservation.user = user || reservation.user;
    reservation.space = spaceId || reservation.space;
    reservation.reservedAt = reservedAt || reservation.reservedAt;
    reservation.status = status || reservation.status;

    await reservation.save();
    res.status(200).json({ reservation });
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
    res.status(200).json({ message: 'Reserva eliminada con éxito' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Eliminar todas las reservas
exports.deleteAllReservations = async (req, res) => {
  try {
    const result = await Reservation.deleteMany();
    res.status(200).json({ message: `Se han eliminado ${result.deletedCount} reservas con éxito` });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
