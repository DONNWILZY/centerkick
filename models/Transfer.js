const mongoose = require('mongoose');

const TransferSchema = new mongoose.Schema({
  player: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', 
    required: true,
  },
  fromTeam: {
    type: String,
   
  },
 

  transferFee: {
    type: Number,
  },

 
  additionalDetails: {
    type: String,
  },
});

const Transfer = mongoose.model('Transfer', TransferSchema);

module.exports = Transfers;
