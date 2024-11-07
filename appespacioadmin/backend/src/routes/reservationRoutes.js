const express = require('express');
const { createReservation } = require('../controllers/reservationController');
const router = express.Router();

router.post('/reserve', createReservation);

module.exports = router;
