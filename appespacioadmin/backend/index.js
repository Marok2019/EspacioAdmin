const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const userRoutes = require('./src/routes/userRoutes'); // Ruta de usuarios
const condominiumRoutes = require('./src/routes/condominiumRoutes'); // Ruta de condominios
const authMiddleware = require('./src/middleware/authMiddleware'); // Middleware para protección de rutas

// Cargar variables de entorno
dotenv.config();

// Crear la aplicación Express
const app = express();

// Middleware
app.use(express.json()); // Para parsear el cuerpo de las solicitudes como JSON
app.use(cors()); // Habilitar CORS

// Conectar a la base de datos MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB conectado'))
  .catch((err) => console.log('Error de conexión a MongoDB:', err));

// Rutas
// Usamos el prefijo '/api/users' para las rutas de usuario
app.use('/api/users', userRoutes);

// Usamos el prefijo '/api/condominiums' para las rutas de condominios
app.use('/api/condominiums', condominiumRoutes);

// Ruta de prueba
app.get('/', (req, res) => {
  res.send('¡Bienvenido a EspacioAdmin!');
});

// Otras rutas protegidas por middleware (si las tienes)
app.get('/protected', authMiddleware, (req, res) => {
  res.send('Ruta protegida, acceso autorizado');
});

// Escuchar en el puerto especificado
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
