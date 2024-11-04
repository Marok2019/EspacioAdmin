const express = require('express');
const { connectDB } = require('./config/database');
const { authMiddleware } = require('./middleware/auth');
require('dotenv').config();

const app = express();
app.use(express.json());

// Conectar a MongoDB
connectDB();

// Rutas públicas
app.use('/api/auth', require('./routes/auth'));

// Rutas protegidas
app.use('/api', authMiddleware);
app.use('/api/users', require('./routes/users'));
app.use('/api/common-expenses', require('./routes/commonExpenses'));
app.use('/api/reservations', require('./routes/reservations'));
app.use('/api/condominiums', require('./routes/condominiums'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});