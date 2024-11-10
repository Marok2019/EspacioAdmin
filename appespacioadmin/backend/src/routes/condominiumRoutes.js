const express = require('express');
const router = express.Router();
const condominiumController = require('../controllers/condominiumController');

// Ruta para eliminar todos los condominios
router.delete('/', condominiumController.deleteAllCondominiums);

// Ruta para crear un condominio
router.post('/', condominiumController.createCondominium);

// Ruta para obtener todos los condominios
router.get('/', condominiumController.getCondominiums);

// Ruta para obtener un condominio por ID
router.get('/:id', condominiumController.getCondominiumById);

// Ruta para actualizar un condominio
router.put('/:id', condominiumController.updateCondominium);

// Ruta para eliminar un condominio
router.delete('/:id', condominiumController.deleteCondominium);

// Ruta para obtener los espacios comunes de un condominio por ID
router.get('/:id/common-spaces', condominiumController.getCommonSpacesByCondominiumId);


module.exports = router;
