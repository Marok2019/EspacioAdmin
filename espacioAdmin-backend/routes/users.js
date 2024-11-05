// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');

// Ruta para crear un usuario
router.post('/create', userController.createUser);

// Ruta para obtener todos los usuarios
router.get('/all', authMiddleware.isAdmin, userController.getAllUsers);

// Ruta para obtener un usuario por ID
router.get('/:id', authMiddleware.isAdmin, userController.getUserById);

// Ruta para actualizar un usuario
router.put('/:id', authMiddleware.isAdmin, userController.updateUser);

// Ruta para eliminar un usuario
router.delete('/:id', authMiddleware.isAdmin, userController.deleteUser);

module.exports = router;
