const express = require('express');
const userController = require('../controllers/userController');
const { verifyToken } = require('../controllers/authController');

const router = express.Router();

router.get('/data', verifyToken, userController.getUserData);

module.exports = router;