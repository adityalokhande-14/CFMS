const Fine = require('../models/Fine');
const User = require('../models/User');

exports.getAdminData = async (req, res) => {
  try {
    const users = await User.find({ role: 'user' });
    const fines = await Fine.find({ assigned_by: req.user.id });
    res.json({ users, fines });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};