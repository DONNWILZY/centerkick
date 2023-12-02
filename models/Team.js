const mongoose = require('mongoose');

const TeamSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  foundedYear: {
    type: Number,
  },
  coach: {
    type: String,
  },
  players: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', 
    },
  ],
  trophies: [
    {
      name: String,
      year: Number,
    },
  ],
});

const Team = mongoose.model('Team', TeamSchema);

module.exports = Team;
