const express = require('express');
const router = express.Router({ mergeParams: true });
const commonSpaceController = require('../controllers/commonSpaceController');

// Ruta para crear un espacio común
router.post('/', commonSpaceController.createCommonSpace);

// Ruta para obtener todos los espacios comunes de un condominio
router.get('/', commonSpaceController.getCommonSpaces);

// Ruta para obtener un espacio común por ID
router.get('/:id', commonSpaceController.getCommonSpaceById);

// Ruta para actualizar un espacio común
router.put('/:id', commonSpaceController.updateCommonSpace);

// Ruta para eliminar un espacio común
router.delete('/:id', commonSpaceController.deleteCommonSpace);

module.exports = router;
