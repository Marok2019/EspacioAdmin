const express = require('express');
const { register, login, getUsers, getUserById, updateUser, deleteUser } = require('../controllers/userController');
const router = express.Router();

// Ruta para registrar un nuevo usuario
router.post('/register', register);

// Ruta para iniciar sesión
router.post('/login', login);

// Ruta para obtener todos los usuarios
router.get('/', getUsers);

// Ruta para obtener un usuario por su ID
router.get('/:id', getUserById);

// Ruta para eliminar un usuario
router.delete('/:id', deleteUser);

router.put('/:id', updateUser); // Ruta para actualizar un usuario


module.exports = router;
