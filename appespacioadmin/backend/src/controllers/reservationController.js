const Reservation = require('../models/Reservation');
const User = require('../models/User');
const Condominium = require('../models/Condominium');

// Crear una reserva
exports.createReservation = async (req, res) => {
  const { userId, commonSpace, startDate, endDate, condominium } = req.body;

  console.log('Datos recibidos:', req.body);

  if (!startDate || !endDate || !commonSpace || !condominium) {
    return res.status(400).json({ message: 'Faltan datos necesarios para la reserva.' });
  }

  try {
    const existingReservation = await Reservation.findOne({
      commonSpace,
      startDate: { $lt: endDate },
      endDate: { $gt: startDate },
      condominium,
    });

    if (existingReservation) {
      return res.status(400).json({ message: 'Ya existe una reserva para este espacio en esas fechas.' });
    }

    const reservation = new Reservation({
      user: userId,
      commonSpace,
      startDate,
      endDate,
      reservedAt: Date.now(),
      condominium,
    });

    const savedReservation = await reservation.save();
    res.status(201).json(savedReservation);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear la reserva', error: error.message });
  }
};

// Obtener todas las reservas o con filtros
exports.getReservations = async (req, res) => {
  const { rut, espacio, condominio } = req.query;
  console.log('Parámetros de entrada:', { rut, espacio, condominio });

  try {
    const filter = {};

    if (rut) {
      const user = await User.findOne({ rut }).select('_id');
      if (user) {
        filter.user = user._id;
      } else {
        return res.status(404).json({ message: 'Usuario con ese RUT no encontrado.' });
      }
    }

    if (espacio) {
      filter.commonSpace = espacio;
    }

    if (condominio) {
      const condominium = await Condominium.findOne({ name: condominio });
      if (condominium) {
        filter.condominium = condominium._id;
      } else {
        return res.status(404).json({ message: 'Condominio no encontrado.' });
      }
    }

    const reservations = await Reservation.find(filter)
      .populate('user', 'rut')
      .populate('condominium', 'name');

    res.json(reservations);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener las reservas filtradas', error });
  }
};

// Obtener una reserva por ID
exports.getReservationById = async (req, res) => {
  const { id } = req.params;

  try {
    const reservation = await Reservation.findById(id)
      .populate('user', 'name rut')
      .populate('condominium', 'name');

    if (!reservation) {
      return res.status(404).json({ message: 'Reserva no encontrada.' });
    }

    res.json(reservation);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener la reserva', error });
  }
};

// Actualizar una reserva
exports.updateReservation = async (req, res) => {
  const { id } = req.params;
  const { commonSpace, startDate, endDate, condominiumId } = req.body;

  try {
    const updatedReservation = await Reservation.findByIdAndUpdate(
      id,
      { commonSpace, startDate, endDate, condominium: condominiumId },
      { new: true }
    );

    if (!updatedReservation) {
      return res.status(404).json({ message: 'Reserva no encontrada.' });
    }

    res.json(updatedReservation);
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar la reserva', error });
  }
};

// Eliminar una reserva
exports.deleteReservation = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedReservation = await Reservation.findByIdAndDelete(id);

    if (!deletedReservation) {
      return res.status(404).json({ message: 'Reserva no encontrada.' });
    }

    res.json({ message: 'Reserva eliminada con éxito.' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar la reserva', error });
  }
};

// Eliminar todas las reservas
exports.deleteAllReservations = async (req, res) => {
  try {
    const result = await Reservation.deleteMany({});
    res.json({ message: 'Todas las reservas han sido eliminadas.', deletedCount: result.deletedCount });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar todas las reservas', error });
  }
};
