const { Reservation } = require('../models');

exports.createReservation = async (req, res) => {
  try {
    const reservation = await Reservation.create({
      ...req.body,
      user: req.user.id
    });

    res.status(201).json({
      success: true,
      data: reservation
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

exports.getReservations = async (req, res) => {
  try {
    const reservations = await Reservation.find()
      .populate('commonArea')
      .populate('user', 'name email')
      .sort('-startTime');
    
    res.json({
      success: true,
      data: reservations
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};