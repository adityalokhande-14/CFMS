const { getAdminData } = require('../database');

exports.getAdminData = async (req, res) => {
  try {
    const data = await getAdminData(req.user.id);
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};