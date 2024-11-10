const Condominium = require('../models/Condominium');

// Crear un nuevo condominio
exports.createCondominium = async (req, res) => {
  const { name, location, gym, cowork, quincho, estacionamientoVisitas, salonEventos, canchaDeportes } = req.body;
  try {
    const condominium = new Condominium({
      name,
      location,
      gym,
      cowork,
      quincho,
      estacionamientoVisitas,
      salonEventos,
      canchaDeportes,
    });
    await condominium.save();
    res.status(201).json(condominium);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obtener todos los condominios
exports.getCondominiums = async (req, res) => {
  try {
    const condominiums = await Condominium.find();
    res.json(condominiums);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obtener un condominio por su ID
exports.getCondominiumById = async (req, res) => {
  try {
    const condominium = await Condominium.findById(req.params.id);
    if (!condominium) {
      return res.status(404).json({ message: 'Condominio no encontrado' });
    }
    res.json(condominium);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateCondominium = async (req, res) => {
  const { name, location, gym, cowork, quincho, estacionamientoVisitas, salonEventos, canchaDeportes } = req.body;
  
  console.log(req.body); // Agregar este log para verificar los datos recibidos.

  try {
    const condominium = await Condominium.findById(req.params.id);
    if (!condominium) {
      return res.status(404).json({ message: 'Condominio no encontrado' });
    }

    condominium.name = name || condominium.name;
    condominium.location = location || condominium.location;
    condominium.gym = gym !== undefined ? gym : condominium.gym;
    condominium.cowork = cowork !== undefined ? cowork : condominium.cowork;
    condominium.quincho = quincho !== undefined ? quincho : condominium.quincho;
    condominium.estacionamientoVisitas = estacionamientoVisitas !== undefined ? estacionamientoVisitas : condominium.estacionamientoVisitas;
    condominium.salonEventos = salonEventos !== undefined ? salonEventos : condominium.salonEventos;
    condominium.canchaDeportes = canchaDeportes !== undefined ? canchaDeportes : condominium.canchaDeportes;

    await condominium.save();
    res.json(condominium);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Eliminar un condominio
exports.deleteCondominium = async (req, res) => {
  try {
    const condominium = await Condominium.findById(req.params.id);
    if (!condominium) {
      return res.status(404).json({ message: 'Condominio no encontrado' });
    }

    await Condominium.deleteOne({ _id: req.params.id });
    res.json({ message: 'Condominio eliminado con éxito' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Función para eliminar todos los condominios
exports.deleteAllCondominiums = async (req, res) => {
  try {
    console.log('Eliminando todos los condominios...'); // Log de depuración
    await Condominium.deleteMany({});
    res.status(200).json({ message: 'Todos los condominios han sido eliminados con éxito' });
  } catch (error) {
    console.error('Error al eliminar todos los condominios:', error); // Log de error
    res.status(500).json({ message: error.message });
  }
};

// Obtener los espacios comunes de un condominio
exports.getCommonSpacesByCondominiumId = async (req, res) => {
  try {
    const condominium = await Condominium.findById(req.params.id);
    if (!condominium) {
      return res.status(404).json({ message: 'Condominio no encontrado' });
    }

    // Aquí puedes devolver solo los espacios comunes
    const commonSpaces = {
      gym: condominium.gym,
      cowork: condominium.cowork,
      quincho: condominium.quincho,
      estacionamientoVisitas: condominium.estacionamientoVisitas,
      salonEventos: condominium.salonEventos,
      canchaDeportes: condominium.canchaDeportes,
    };

    res.json(commonSpaces);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


