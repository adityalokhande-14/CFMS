const mongoose = require('mongoose');
const Fine = require('./models/Fine');
const Document = require('./models/Document');
const User = require('./models/User');
const Admin = require('./models/Admin');

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const getUserData = async (userId, userRole) => {
  try {
    const fines = await Fine.find({ user_id: userId });
    const documents = await Document.find({ available_for: userRole });
    return { fines, documents };
  } catch (error) {
    throw new Error('Error fetching user data');
  }
};

const getAdminData = async (adminId) => {
  try {
    const users = await User.find({ role: 'user' });
    const fines = await Fine.find({});
    return { users, fines };
  } catch (error) {
    throw new Error('Error fetching admin data');
  }
};

const findUserByIdentifier = async (identifier, role) => {
  if (role === 'user') {
    return await User.findOne({ aadhaarNumber: identifier });
  } else if (role === 'admin') {
    return await Admin.findOne({ email: identifier });
  }
};

module.exports = {
  getUserData,
  getAdminData,
  findUserByIdentifier,
};