const Fine = require('../models/Fine');
const Document = require('../models/Document');

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
    console.error('Error fetching user data:', err);
    res.status(500).json({ error: 'Failed to fetch user data' });
  }
};