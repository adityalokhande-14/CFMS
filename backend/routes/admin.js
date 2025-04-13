const express = require('express');
const adminController = require('../controllers/adminController');
const { verifyToken } = require('../controllers/authController');

const router = express.Router();

// Route to fetch admin data
router.get('/data', verifyToken, adminController.getAdminData);

// Route to reset all fines to unpaid
router.post('/fines/reset', verifyToken, adminController.resetFinesToUnpaid);

module.exports = router;