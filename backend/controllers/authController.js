const { findUserByIdentifier } = require('../database');
const jwt = require('jsonwebtoken');
const config = require('../config');

exports.login = async (req, res) => {
  try {
    const { identifier, password, role } = req.body;
    console.log(`Login attempt: identifier=${identifier}, role=${role}`);

    const user = await findUserByIdentifier(identifier, role);

    if (!user) {
      console.log('User not found');
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      console.log('Password does not match');
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user._id, aadhaarNumber: user.aadhaarNumber, role }, config.jwtSecret, { expiresIn: '1h' });
    console.log(`Login successful for user ID: ${user._id}`);
    res.json({ token });
  } catch (error) {
    console.log(`Server error: ${error.message}`);
    res.status(500).json({ message: "Server error" });
  }
};

exports.verifyToken = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    if (!token) {
      console.log('Authorization token missing');
      return res.status(401).json({ message: "Unauthorized" });
    }
    jwt.verify(token, config.jwtSecret, (err, decoded) => {
      if (err) {
        console.log('Token verification failed:', err.message);
        return res.status(401).json({ message: "Unauthorized" });
      }
      req.user = decoded;
      console.log('Token verified, user:', req.user);
      next();
    });
  } catch (error) {
    console.error("Error in verifyToken middleware:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};