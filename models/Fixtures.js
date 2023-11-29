/////// fixtures
const mongoose = require('mongoose');

const FixtureSchema = new mongoose.Schema({
  
  teamOne: {
    type: String,
    // required: true,
  },
  teamTwo: {
    type: String,
    // required: true,
  },

  competition: {
    type: String,
    // required: true,
  },

  date: {
    type: Date,
    // required: true,
  },

  
  
});

const fixtures = mongoose.model('fixtures', FixtureSchema);

module.exports = fixtures;
