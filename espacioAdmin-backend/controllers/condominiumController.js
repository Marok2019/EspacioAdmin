// controllers/condominiumController.js
const Condominium = require('../models/Condominium');

// Crear un nuevo condominio
exports.createCondominium = async (req, res) => {
  try {
    const condominium = new Condominium(req.body);  // Crea el nuevo condominio a partir de los datos del cuerpo de la solicitud
    await condominium.save();  // Guarda el condominio en la base de datos
    res.status(201).json({ message: 'Condominio creado exitosamente', condominium });
  } catch (err) {
    res.status(400).json({ error: err.message });  // En caso de error, devuelve el mensaje de error
  }
};

// Obtener todos los condominios
exports.getAllCondominiums = async (req, res) => {
  try {
    const condominiums = await Condominium.find();  // Obtiene todos los condominios de la base de datos
    res.status(200).json({ condominiums });
  } catch (err) {
    res.status(400).json({ error: err.message });  // En caso de error, devuelve el mensaje de error
  }
};

// Obtener un condominio por ID
exports.getCondominiumById = async (req, res) => {
  try {
    const condominium = await Condominium.findById(req.params.id);  // Busca un condominio por su ID
    if (!condominium) {
      return res.status(404).json({ error: 'Condominio no encontrado' });  // Si no se encuentra, retorna error
    }
    res.status(200).json({ condominium });
  } catch (err) {
    res.status(400).json({ error: err.message });  // En caso de error, devuelve el mensaje de error
  }
};

// Actualizar un condominio
exports.updateCondominium = async (req, res) => {
  try {
    const condominium = await Condominium.findByIdAndUpdate(req.params.id, req.body, { new: true });  // Actualiza el condominio
    if (!condominium) {
      return res.status(404).json({ error: 'Condominio no encontrado' });  // Si no se encuentra el condominio, retorna error
    }
    res.status(200).json({ message: 'Condominio actualizado exitosamente', condominium });
  } catch (err) {
    res.status(400).json({ error: err.message });  // En caso de error, devuelve el mensaje de error
  }
};

// Eliminar un condominio
exports.deleteCondominium = async (req, res) => {
  try {
    const condominium = await Condominium.findByIdAndDelete(req.params.id);  // Elimina el condominio por ID
    if (!condominium) {
      return res.status(404).json({ error: 'Condominio no encontrado' });  // Si no se encuentra, retorna error
    }
    res.status(200).json({ message: 'Condominio eliminado exitosamente' });
  } catch (err) {
    res.status(400).json({ error: err.message });  // En caso de error, devuelve el mensaje de error
  }
};
