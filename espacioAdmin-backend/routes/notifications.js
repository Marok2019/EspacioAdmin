const express = require('express');
const Notification = require('../models/Notification');
const router = express.Router();

// Crear una notificación
router.post('/create', async (req, res) => {
    try {
        const { user, message } = req.body;
        const newNotification = new Notification({ user, message });
        await newNotification.save();
        res.status(201).json({ message: 'Notificación enviada exitosamente' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Obtener notificaciones de un usuario
router.get('/:userId', async (req, res) => {
    try {
        const notifications = await Notification.find({ user: req.params.userId });
        res.status(200).json(notifications);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Marcar notificación como leída
router.put('/:id/read', async (req, res) => {
    try {
        const notification = await Notification.findByIdAndUpdate(req.params.id, { read: true }, { new: true });
        if (!notification) return res.status(404).json({ message: 'Notificación no encontrada' });
        res.status(200).json(notification);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
