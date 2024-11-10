// index.js - Servidor principal

const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const commonExpenseRoutes = require('./src/routes/commonExpenseRoutes');


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

// Importar controladores

const {
  createCondominium,
  getCondominiums,
  getCondominiumById,
  updateCondominium,
  deleteCondominium,
  deleteAllCondominiums,
  getCommonSpacesByCondominiumId,
} = require('./src/controllers/condominiumController');

const {
  register,
  login,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
  deleteAllUsers,
} = require('./src/controllers/userController');

const {
  createReservation,
  getReservations,
  getReservationById,
  updateReservation,
  deleteReservation,
} = require('./src/controllers/reservationController');

const {
  createExpense,
  getAllExpenses,
  getExpenseById,
  updateExpense,
  deleteExpense,
} = require('./src/controllers/commonExpenseController');

// Rutas de Condominios
app.post('/api/condominiums', createCondominium); // Crear un nuevo condominio
app.get('/api/condominiums', getCondominiums); // Obtener todos los condominios
app.get('/api/condominium/:id', getCondominiumById); // Obtener un condominio por ID
app.get('/api/condominiums/:id/common-spaces', getCommonSpacesByCondominiumId); // Obtener los espacios comunes de un condominio
app.put('/api/condominium/:id', updateCondominium); // Actualizar un condominio
app.delete('/api/condominium/:id', deleteCondominium); // Eliminar un condominio
app.delete('/api/condominiums', deleteAllCondominiums); // Eliminar todos los condominios

app.post('/api/common-expenses', createExpense); // Crear un nuevo gasto común
app.get('/api/common-expenses', getAllExpenses); // Obtener todos los gastos comunes
app.get('/api/common-expenses/:id', getExpenseById); // Obtener un gasto común por ID
app.put('/api/common-expenses/:id', updateExpense); // Actualizar un gasto común
app.delete('/api/common-expenses/:id', deleteExpense); // Eliminar un gasto común


// Rutas de Usuarios
app.post('/api/register', register); // Registrar un nuevo usuario
app.post('/api/login', login); // Iniciar sesión de usuario
app.get('/api/users', getUsers); // Obtener todos los usuarios
app.get('/api/user/:id', getUserById); // Obtener un usuario por ID
app.put('/api/user/:id', updateUser); // Actualizar un usuario
app.delete('/api/user/:id', deleteUser); // Eliminar un usuario
app.delete('/api/users', deleteAllUsers); // Eliminar todos los usuarios

// Rutas de Reservas
app.post('/api/reservations', createReservation); // Crear una nueva reserva
app.get('/api/reservations', getReservations); // Obtener todas las reservas
app.get('/api/reservation/:id', getReservationById); // Obtener una reserva por ID
app.put('/api/reservation/:id', updateReservation); // Actualizar una reserva
app.delete('/api/reservation/:id', deleteReservation); // Eliminar una reserva

app.use('/api/common-expenses', commonExpenseRoutes);

// Puerto de escucha
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
