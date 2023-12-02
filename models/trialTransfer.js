const mongoose = require('mongoose');

const TransferSchema = new mongoose.Schema({
  player: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', 
    required: true,
  },
  fromTeam: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Team', 
    required: true,
  },
  toTeam: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Team',
    required: true,
  },
  transferDate: {
    type: Date,
    default: Date.now,
    required: true,
  },
  transferFee: {
    type: Number,
  },
  contractDuration: {
    type: Number, // Represented in years
  },
  additionalDetails: {
    type: String,
  },
});

const Transfers = mongoose.model('Transfers', TransferSchema);

module.exports = Transfers;
