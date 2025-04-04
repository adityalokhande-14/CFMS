const express = require('express');
const adminController = require('../controllers/adminController');
const { verifyToken } = require('../controllers/authController');

const router = express.Router();

router.get('/data', verifyToken, adminController.getAdminData);

module.exports = router;