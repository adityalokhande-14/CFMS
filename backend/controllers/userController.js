const Fine = require('../models/Fine');
const Document = require('../models/Document');

// Fetch user data (fines and documents)
exports.getUserData = async (req, res) => {
  try {
    const aadhaarNumber = req.user.aadhaarNumber; // Use aadhaarNumber instead of userId
    console.log(`Fetching user data for Aadhaar Number: ${aadhaarNumber}`);

    const fines = await Fine.find({ aadhaarNumber: aadhaarNumber });
    console.log('Fines:', fines);

    const documents = await Document.find({ aadhaarNumber: aadhaarNumber });
    console.log('Documents:', documents);

    res.json({ fines, documents });
  } catch (err) {
    console.error('Error fetching user data:', err.message, err.stack);
    res.status(500).json({ error: 'Failed to fetch user data' });
  }
};
exports.payFine = async (req, res) => {
  try {
    console.log('Request Payload:', req.body); // Log the request body
    const { fine_id } = req.body;

    // Validate input
    if (!fine_id) {
      console.error('Fine ID is missing');
      return res.status(400).json({ message: 'Fine ID is required' });
    }

    // Find the fine by ID
    const fine = await Fine.findById(fine_id);
    if (!fine) {
      console.error(`Fine not found for ID: ${fine_id}`);
      return res.status(404).json({ message: 'Fine not found' });
    }

    // Check if the fine is already paid
    if (fine.status === 'paid') {
      console.error(`Fine with ID: ${fine_id} is already paid`);
      return res.status(400).json({ message: 'Fine is already paid' });
    }

    // Update the fine's status to 'paid'
    fine.status = 'paid';

    // Save only the modified fields, bypassing validation for others
    await fine.save({ validateModifiedOnly: true });

    console.log(`Fine with ID: ${fine_id} updated to paid`);

    res.status(200).json({ message: 'Fine paid successfully', fine });
  } catch (err) {
    // Log the error with stack trace for detailed debugging
    console.error('Error paying fine:', err.message, err.stack);

    // Send a generic error message to the client
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
};