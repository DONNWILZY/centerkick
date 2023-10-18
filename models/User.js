const mongoose = require('mongoose');
const {Athlete, Stats, Transfer, NextMatch, CareerStat} = require('./Athlete'); 

// Define the User Schema
const userSchema = new mongoose.Schema({
  athlete: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Athlete',
},
  fullname: {
    type: String,
   // required: true,
  },
  password: {
    type: String,
    //required: true,
  },
  phoneNumber: {
    type: String,
    //unique: true,
  },
  email: {
    type: String,
    unique: true,
    //required: true,
  },
  verifiedEmail: {
    type: Boolean,
    default: false,
  },
  verifiedPhone: {
    type: Boolean,
    default: false,
  },
  gender: {
    type: String,
    enum: ['male', 'female', 'other'],
  },
  role: {
    type: String,
    enum: ['isUser', 'isAdmin', 'isModerator'],
    default: 'isUser',
  },
  images: [
    {
      url: {
        type: String,
      },
      caption: {
        type: String,
      },
    },
  ],
  displayPhoto: {
    url: {
      type: String,
    },
    caption: {
      type: String,
    },
  },

  isAthlete: {
    type: Boolean,
    default: true,
  },

  athletes: [Athlete.schema], // Embed athlete data
  stats: [Stats.schema], // Embed stats data
  transfers: [Transfer.schema], // Embed transfer data
  nextMatches: [NextMatch.schema], // Embed nextMatch data
  careerStats: [CareerStat.schema], // Embed careerStat data

},


{
  // Time Stamps: Created At and Updated
  timestamps: true,
});

// Create the User model
const User = mongoose.model('User', userSchema);

module.exports = User;
