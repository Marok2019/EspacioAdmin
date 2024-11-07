const express = require('express');
const {
  createCondominium,
  getCondominiums,
  getCondominiumById,
  updateCondominium,
  deleteCondominium,
  deleteAllCondominiums
} = require('../controllers/condominiumController');

const router = express.Router();

// Crear un nuevo condominio
router.post('/create', createCondominium);

// Obtener todos los condominios
router.get('/', getCondominiums);

// Obtener un condominio por su ID
router.get('/:id', getCondominiumById);

// Actualizar un condominio
router.put('/:id', updateCondominium);

// Eliminar un condominio
router.delete('/:id', deleteCondominium);

router.delete('/', deleteAllCondominiums);

module.exports = router;
