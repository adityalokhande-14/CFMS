const express = require('express');
const userController = require('../controllers/userController');
const { verifyToken } = require('../controllers/authController');

const router = express.Router();

router.get('/data', verifyToken, userController.getUserData);

// Add a route to handle fine payment
router.post('/fine/pay', verifyToken, userController.payFine);

module.exports = router;