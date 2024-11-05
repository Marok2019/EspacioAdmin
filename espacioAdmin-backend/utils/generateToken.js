const jwt = require('jsonwebtoken');

// Función para generar un token JWT
const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: '30d', // Define la duración del token
  });
};

module.exports = generateToken;
