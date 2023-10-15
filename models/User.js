const mongoose = require('mongoose');

// Define the User Schema
const userSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    unique: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
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
  },
  createdBy: [
    {
      admin: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
      fullname: {  // Corrected field name
        type: String,
      },
      email: {
        type: String,
      },
      content: {
        type: String,
      },
      timestamp: {
        type: Date,
        default: Date.now,
      },
    },
  ],
},


{
  // Time Stamps: Created At and Updated
  timestamps: true,
});

// Create the User model
const User = mongoose.model('User', userSchema);

module.exports = User;
