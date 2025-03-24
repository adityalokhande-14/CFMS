const mongoose = require('mongoose');

const FineSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  fine_type: { type: String, required: true },
  fine_amount: { type: Number, required: true },
  assigned_by: { type: mongoose.Schema.Types.ObjectId, ref: 'Admin', required: true },
});

module.exports = mongoose.model('Fine', FineSchema);