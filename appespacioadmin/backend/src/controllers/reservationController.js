const Reservation = require('../models/Reservation');
const User = require('../models/User'); // Asegúrate de importar el modelo de User
const Condominium = require('../models/Condominium');
const mongoose = require('mongoose');

// Crear una reserva
exports.createReservation = async (req, res) => {
  const { userId, commonSpace, startDate, endDate, condominium } = req.body;

  // Verificar los datos recibidos antes de continuar
  console.log("Datos recibidos:", req.body);
  console.log("Fecha de inicio:", startDate);
  console.log("Fecha de fin:", endDate);

  // Verificar si los datos esenciales están presentes
  if (!startDate || !endDate || !commonSpace || !condominium) {
    return res.status(400).json({ message: "Faltan datos necesarios para la reserva." });
  }

  try {
    // Verificar si ya existe una reserva para el mismo espacio y fecha
    const existingReservation = await Reservation.findOne({
      commonSpace,
      startDate: { $lt: endDate },  // Verificamos si la fecha de inicio es antes que la de fin
      endDate: { $gt: startDate },  // Verificamos si la fecha de fin es después que la de inicio
      condominium
    });

    if (existingReservation) {
      return res.status(400).json({ message: 'Ya existe una reserva para este espacio en esas fechas' });
    }

    // Crear la reserva con las tres fechas correctas
    const reservation = new Reservation({
      user: userId,
      commonSpace,
      startDate,  // La fecha de inicio de uso del espacio
      endDate,    // La fecha de fin del uso del espacio
      reservedAt: Date.now(),  // La fecha de creación de la reserva (fecha actual)
      condominium
    });

    await reservation.save();
    res.status(201).json(reservation);
  } catch (error) {
    console.log("Error al crear reserva:", error);
    res.status(500).json({ message: error.message });
  }
};

// Obtener todas las reservas o con filtros
// Obtener todas las reservas o con filtros
exports.getReservations = async (req, res) => {
  try {
    const { rut, espacio, condominio } = req.query;

    // Creamos un objeto de filtros vacío
    const filter = {};

    // Si se recibe un filtro para 'rut', buscamos al usuario
    if (rut) {
      const user = await User.findOne({ rut }).select('_id');
      if (user) {
        filter.user = user._id;
      } else {
        return res.status(404).json({ message: 'Usuario con ese RUT no encontrado' });
      }
    }

    // Si se recibe un filtro para 'espacio', lo agregamos
    if (espacio) {
      filter.commonSpace = espacio;
    }

    // Si se recibe un filtro para 'condominio', lo buscamos por nombre
    if (condominio) {
      const condominium = await Condominium.findOne({ name: condominio }); // Buscar por nombre
      if (condominium) {
        filter.condominium = condominium._id; // Asignar el ObjectId del condominio
      } else {
        return res.status(404).json({ message: 'Condominio no encontrado' });
      }
    }

    // Si no se pasan filtros, retornamos todas las reservas
    const reservations = await Reservation.find(filter)
      .populate('user', 'rut')  // Asegúrate de que la propiedad 'rut' del modelo User se incluya
      .populate('condominium', 'name') // Incluye el nombre del condominio
      .exec();

    if (reservations.length === 0) {
      return res.status(404).json({ message: 'No se encontraron reservas con los filtros proporcionados.' });
    }

    res.json(reservations); // Devuelve las reservas encontradas
  } catch (error) {
    console.error('Error al obtener reservas filtradas:', error);
    res.status(500).json({ message: 'Error al obtener las reservas filtradas.' });
  }
};


// Obtener una reserva por ID
exports.getReservationById = async (req, res) => {
  try {
    const reservation = await Reservation.findById(req.params.id).populate('user condominium');
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
  const { commonSpace, startDate, endDate, condominiumId } = req.body;

  try {
    const reservation = await Reservation.findById(req.params.id);
    if (!reservation) {
      return res.status(404).json({ message: 'Reserva no encontrada' });
    }

    // Actualizar los campos que se pasen en el cuerpo de la solicitud
    if (commonSpace) reservation.commonSpace = commonSpace;
    if (startDate) reservation.startDate = startDate;
    if (endDate) reservation.endDate = endDate;
    if (condominiumId) reservation.condominium = condominiumId;

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

// Eliminar todas las reservas
exports.deleteAllReservations = async (req, res) => {
  try {
    const result = await Reservation.deleteMany({});
    res.json({ message: 'Todas las reservas han sido eliminadas', deletedCount: result.deletedCount });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
