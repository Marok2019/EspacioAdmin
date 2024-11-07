const Condominium = require('../models/Condominium');

// Crear un nuevo condominio
exports.createCondominium = async (req, res) => {
  const { name, location, services } = req.body;
  
  try {
    const condominium = new Condominium({
      name,
      location,
      services
    });
    
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
    condominium.services = services || condominium.services;

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
