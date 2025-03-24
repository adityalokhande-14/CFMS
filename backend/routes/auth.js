const express = require('express');
const { login, verifyToken } = require('../controllers/authController');
const router = express.Router();

router.post('/login', login);
router.use(verifyToken);

module.exports = router;