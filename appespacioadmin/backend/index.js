const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

// Cargar variables de entorno
dotenv.config();

// Crear la aplicación Express
const app = express();

// Middleware
app.use(cors()); // Permite solicitudes desde otros orígenes
app.use(express.json()); // Parsear cuerpo de las solicitudes en formato JSON (en lugar de body-parser)

// Conectar a la base de datos de MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Conectado a la base de datos MongoDB'))
  .catch((error) => console.error('Error al conectar a la base de datos MongoDB:', error));

// Importar routers
const userRoutes = require('./src/routes/userRoutes');
const commonExpenseRoutes = require('./src/routes/commonExpenseRoutes');
const reservationRoutes = require('./src/routes/reservationRoutes');
const condominiumRoutes = require('./src/routes/condominiumRoutes');

// Rutas de la API
app.use('/api/users', userRoutes);
app.use('/api/common-expenses', commonExpenseRoutes);
app.use('/api/reservations', reservationRoutes);
app.use('/api/condominiums', condominiumRoutes);

// Puerto de escucha
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
