// generate-jwt.js
const jwt = require('jsonwebtoken');
const User = require('./src/models/User');  // Asegúrate de que la ruta sea correcta
require('dotenv').config();

const generateJWTForUser = async () => {
  try {
    // Ejemplo: generar un token para el primer usuario en la base de datos
    const user = await User.findOne();  // O ajusta a lo que necesites
    if (!user) {
      console.log('No se encontró usuario');
      return;
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    console.log('Token generado:', token);
  } catch (error) {
    console.error('Error al generar el token:', error.message);
  }
};

// Ejecuta la función
generateJWTForUser();
