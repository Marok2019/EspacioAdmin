// server.js
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const reservationRoutes = require('./routes/reservationRoutes');
const condominiumRoutes = require('./routes/condominiumRoutes'); // Agregar ruta de condominios
const authMiddleware = require('./middleware/authMiddleware'); // Middleware de autenticación

dotenv.config();
const app = express();

// Middleware para procesar datos JSON
app.use(express.json());

// Conexión a la base de datos
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Conexión a la base de datos exitosa'))
  .catch(err => console.log('Error al conectar a la base de datos', err));

// Usar las rutas para reservas y condominios
app.use('/reservations', reservationRoutes); // Ruta para reservas
app.use('/condominiums', condominiumRoutes); // Ruta para condominios

// Manejo de rutas no encontradas
app.use('*', (req, res) => {
  res.status(404).json({ message: 'Ruta no encontrada' });
});

// Iniciar el servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
