const express = require('express');
const router = express.Router();
const condominiumController = require('../controllers/condominiumController');
const { authMiddleware, isAdmin } = require('../middleware/authMiddleware'); // Correctamente desestructurado

// Ruta para crear un condominio
router.post('/create', authMiddleware, isAdmin, condominiumController.createCondominium);


// Ruta para obtener todos los condominios
router.get('/all', authMiddleware, isAdmin, condominiumController.getAllCondominiums);

// Ruta para obtener un condominio por ID
router.get('/:id', authMiddleware, isAdmin, condominiumController.getCondominiumById);

// Ruta para actualizar un condominio
router.put('/:id', authMiddleware, isAdmin, condominiumController.updateCondominium);

// Ruta para eliminar un condominio
router.delete('/:id', authMiddleware, isAdmin, condominiumController.deleteCondominium);

module.exports = router;
