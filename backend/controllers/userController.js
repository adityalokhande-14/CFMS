const Fine = require('../models/Fine');
const Document = require('../models/Document');

exports.getUserData = async (req, res) => {
  try {
    const fines = await Fine.find({ user_id: req.user.id });
    const documents = await Document.find({ available_for: req.user.role });
    res.json({ fines, documents });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};