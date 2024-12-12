const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

// Importar rutas
const userRoutes = require('./src/routes/userRoutes');
const commonExpenseRoutes = require('./src/routes/commonExpenseRoutes');
const paymentRoutes = require('./src/routes/paymentRoutes');
const reservationRoutes = require('./src/routes/reservationRoutes'); // Nueva importación de rutas de reserva
const condominiumRoutes = require('./src/routes/condominiumRoutes'); // Nueva importación de rutas de condominios

// Cargar variables de entorno
dotenv.config();

// Crear la aplicación Express
const app = express();

// Middleware
app.use(cors()); // Permite solicitudes desde otros orígenes
app.use(express.json()); // Parsear cuerpo de las solicitudes en formato JSON

// Conectar a la base de datos de MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Conectado a la base de datos MongoDB'))
  .catch((error) => console.error('Error al conectar a la base de datos MongoDB:', error));

// Usar las rutas importadas
app.use('/api/users', userRoutes); // Rutas de usuarios
app.use('/api/condominiums', condominiumRoutes); // Rutas de condominios
app.use('/api/common-expenses', commonExpenseRoutes); // Rutas de gastos comunes
app.use('/api/payments', paymentRoutes); // Rutas de pagos
app.use('/api/reservations', reservationRoutes); // Rutas de reservas

// Puerto de escucha
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
