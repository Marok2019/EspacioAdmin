const Condominium = require('../models/Condominium');
const CommonSpace = require('../models/CommonSpace');

// Crear un nuevo condominio
exports.createCondominium = async (req, res) => {
  const { name, location, services } = req.body;
  
  try {
    // Creamos el nuevo condominio
    const condominium = new Condominium({
      name,
      location,
      commonSpaces: [] // Inicializamos con un array vacío
    });

    // Filtramos los tipos de espacios comunes habilitados según los servicios
    const enabledSpaceTypes = Object.keys(services).filter(service => services[service]);

    // Si hay servicios habilitados, buscamos los espacios comunes correspondientes
    const commonSpaces = await CommonSpace.find({
      type: { $in: enabledSpaceTypes }
    });

    // Asignamos los espacios comunes al condominio
    condominium.commonSpaces = commonSpaces.map(space => ({
      name: space.name,
      type: space.type,
      available: space.available
    }));

    // Guardamos el condominio con los espacios comunes asignados
    await condominium.save();
    res.status(201).json({ condominium });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obtener todos los condominios
exports.getCondominiums = async (req, res) => {
  try {
    const condominiums = await Condominium.find();
    res.status(200).json({ condominiums });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obtener un condominio por ID
exports.getCondominiumById = async (req, res) => {
  try {
    const condominium = await Condominium.findById(req.params.id);
    if (!condominium) {
      return res.status(404).json({ message: 'Condominio no encontrado' });
    }
    res.status(200).json({ condominium });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Actualizar un condominio
exports.updateCondominium = async (req, res) => {
  try {
    const condominium = await Condominium.findById(req.params.id);
    if (!condominium) {
      return res.status(404).json({ message: 'Condominio no encontrado' });
    }

    const { name, location, services } = req.body;

    // Actualizamos los campos
    condominium.name = name || condominium.name;
    condominium.location = location || condominium.location;

    // Filtramos los tipos de espacios comunes habilitados según los servicios
    const enabledSpaceTypes = Object.keys(services).filter(service => services[service]);

    // Buscamos los espacios comunes habilitados
    const commonSpaces = await CommonSpace.find({
      type: { $in: enabledSpaceTypes }
    });

    // Asignamos los espacios comunes al condominio
    condominium.commonSpaces = commonSpaces.map(space => ({
      name: space.name,
      type: space.type,
      available: space.available
    }));

    await condominium.save();
    res.status(200).json({ condominium });
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
    res.status(200).json({ message: 'Condominio eliminado con éxito' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Función para eliminar todos los condominios
exports.deleteAllCondominiums = async (req, res) => {
  try {
    await Condominium.deleteMany({});
    res.status(200).json({ message: 'Todos los condominios han sido eliminados con éxito' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
