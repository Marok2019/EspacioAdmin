const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const generateToken = require('../utils/generateToken');

// Registrar un nuevo usuario
exports.register = async (req, res) => {
  const { name, rut, email, password, role } = req.body;

  try {
    // Verificar si el correo electrónico o el RUT ya existen
    const userExists = await User.findOne({ $or: [{ email }, { rut }] });
    if (userExists) {
      return res.status(400).json({ message: 'El correo o RUT ya está registrado' });
    }

    // Hashear la contraseña antes de guardarla
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear un nuevo usuario
    const user = new User({
      name,
      rut,
      email,
      password: hashedPassword,
      role
    });

    // Guardar el usuario en la base de datos
    await user.save();

    // Generar un token JWT para el nuevo usuario
    const token = generateToken(user._id);

    // Enviar respuesta con el usuario y el token
    res.status(201).json({ user, token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Iniciar sesión de usuario
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Buscar al usuario por su email
    const user = await User.findOne({ email });

    // Verificar si el usuario existe y si la contraseña es válida
    if (user && await bcrypt.compare(password, user.password)) {
      // Generar un token JWT
      const token = jwt.sign(
        { userId: user._id, email: user.email, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      );

      // Enviar la respuesta con el token
      res.status(200).json({ token });
    } else {
      // Credenciales inválidas
      res.status(401).json({ message: 'Credenciales inválidas' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obtener todos los usuarios
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find(); // Obtén todos los usuarios
    res.json(users); // Devuelve los usuarios en formato JSON
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obtener un usuario por ID
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id); // Buscar por ID
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    res.json(user); // Devuelve el usuario encontrado
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Actualizar un usuario
exports.updateUser = async (req, res) => {
  const { name, rut, email, role } = req.body;
  try {
    const user = await User.findById(req.params.id); // Buscar al usuario por su ID
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    
    // Actualizar solo los campos que se envían
    user.name = name || user.name;
    user.rut = rut || user.rut;
    user.email = email || user.email;
    user.role = role || user.role;

    await user.save(); // Guardar cambios en la base de datos
    res.json(user); // Retornar el usuario actualizado
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Eliminar un usuario
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id); // Buscar usuario por ID
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    // Usar deleteOne en lugar de remove
    await User.deleteOne({ _id: req.params.id });

    res.json({ message: 'Usuario eliminado con éxito' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Función para eliminar todos los usuarios
exports.deleteAllUsers = async (req, res) => {
  try {
    await User.deleteMany({});
    res.status(200).json({ message: 'Todos los usuarios han sido eliminados con éxito' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};