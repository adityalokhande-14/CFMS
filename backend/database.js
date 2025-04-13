const mongoose = require('mongoose');
const Fine = require('./models/Fine');
const Document = require('./models/Document');
const User = require('./models/User');
const Admin = require('./models/Admin');

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected'))
  .catch(err => {
    console.error('MongoDB connection error:', err.message);
    process.exit(1); // Exit process if connection fails
  });

const getUserData = async (userId, userRole) => {
  try {
    console.log("Fetching user data...");
    const fines = await Fine.find({ user_id: userId });
    const documents = await Document.find({ available_for: userRole });
    console.log("User Data Fetched:", { fines, documents });
    return { fines, documents };
  } catch (error) {
    console.error('Error fetching user data:', error.message, error.stack);
    throw new Error('Error fetching user data');
  }
};

const getAdminData = async (adminId) => {
  try {
    console.log("Fetching users...");
    const users = await User.find({ role: 'user' }).lean();
    console.log("Users fetched:", users);

    console.log("Fetching fines...");
    const fines = await Fine.find({}).lean(); // Fetch fines without population
    console.log("Fines fetched:", fines);

    // Map fines to users using aadhaarNumber
    const usersWithFines = users.map((user) => {
      const userFines = fines.filter((fine) => fine.aadhaarNumber === user.aadhaarNumber);
      return {
        ...user,
        fines: userFines.length > 0 ? userFines : [{ reason: "No fines", amount: 0, status: "N/A" }]
      };
    });

    console.log("Users with fines:", usersWithFines);
    return { users: usersWithFines };
  } catch (error) {
    console.error("Error in getAdminData:", error.message, error.stack);
    throw new Error('Error fetching admin data');
  }
};

const findUserByIdentifier = async (identifier, role) => {
  try {
    console.log(`Finding user by identifier: ${identifier}, role: ${role}`);
    if (role === 'user') {
      const user = await User.findOne({ aadhaarNumber: identifier });
      console.log("User found:", user);
      return user;
    } else if (role === 'admin') {
      const admin = await Admin.findOne({ email: identifier });
      console.log("Admin found:", admin);
      return admin;
    }
    return null;
  } catch (error) {
    console.error('Error finding user by identifier:', error.message, error.stack);
    throw new Error('Error finding user by identifier');
  }
};

module.exports = {
  getUserData,
  getAdminData,
  findUserByIdentifier,
};