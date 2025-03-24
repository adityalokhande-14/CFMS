const User = require('../models/User');
const Admin = require('../models/Admin');
const jwt = require('jsonwebtoken');
const config = require('../config');

exports.login = async (req, res) => {
  try {
    const { username, password, role } = req.body;
    let user;

    if (role === 'user') {
      user = await User.findOne({ username });
    } else if (role === 'admin') {
      user = await Admin.findOne({ username });
    }

    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user._id, role }, config.jwtSecret, { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.verifyToken = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    jwt.verify(token, config.jwtSecret, (err, decoded) => {
      if (err) return res.status(401).json({ message: "Unauthorized" });
      req.user = decoded;
      next();
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};