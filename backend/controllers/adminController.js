const { getAdminData } = require('../database');
const Fine = require('../models/Fine'); // Assuming you have a Fine model defined in your project

// Fetch admin data
exports.getAdminData = async (req, res) => {
  try {
    console.log(`Admin ID: ${req.user.id}`); // Log the admin ID
    const data = await getAdminData(req.user.id);
    console.log('Admin Data:', data); // Log the data being returned
    res.json(data);
  } catch (error) {
    console.error('Error fetching admin data:', error.message, error.stack); // Log the detailed error
    res.status(500).json({ message: "Server error. Check logs for details." });
  }
};

// Reset all fines to unpaid
exports.resetFinesToUnpaid = async (req, res) => {
  try {
    // Reset all fines where the status is "paid" to "unpaid"
    const result = await Fine.updateMany(
      { status: 'paid' }, // Filter: only reset "paid" fines
      { $set: { status: 'unpaid' } } // Update: set status to "unpaid"
    );

    console.log(`${result.nModified} fines reset to unpaid`);
    res.status(200).json({
      message: `${result.nModified} fines successfully reset to unpaid`,
    });
  } catch (error) {
    console.error('Error resetting fines to unpaid:', error.message, error.stack);
    res.status(500).json({
      message: 'Server error. Unable to reset fines. Please try again later.',
    });
  }
};