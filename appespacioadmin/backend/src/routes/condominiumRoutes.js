const express = require('express');
const { createCondominium, getCondominiums } = require('../controllers/condominiumController');
const router = express.Router();

router.post('/create', createCondominium);
router.get('/', getCondominiums);

module.exports = router;
