const mongoose = require('mongoose');

const DocumentSchema = new mongoose.Schema({
  document_name: { type: String, required: true },
  description: { type: String, required: true },
  available_for: { type: String, required: true },
});

module.exports = mongoose.model('Document', DocumentSchema);