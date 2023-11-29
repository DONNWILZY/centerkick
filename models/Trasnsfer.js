/////// fixtures
const mongoose = require('mongoose');

const Transferchema = new mongoose.Schema({
  
  teamOne: {
    type: String,
    // required: true,
  },
  teamTwo: {
    type: String,
    // required: true,
  },

  competetion: {
    type: String,
    // required: true,
  },

  date: {
    type: Date,
    // required: true,
  },

  
  
});

const Transfer = mongoose.model('Transfer', Transferchema);

module.exports = Transfer;
