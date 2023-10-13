const mongoose = require('mongoose');

//// User Schema
const userSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: true,
  },

  password: {
    type: String,
    required: true,
  },

  username: {
    type: String,
    unique: true,
    //required: true,
  },

  phoneNumber: {
    type: String,
    unique: true,
    //required: true,
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

  dob: {
    type: Date,
  },

  role: {
    type: String,
    enum: ['isUser', 'isAdmin', 'isModerator'],
    default: 'isUser',
  },


  placeOfOrigin: {
    town: {
        type: String
    },
    state: {
        type: String
    },
    country: {
        type: String
    },
  },
  resident: {
    town: {
        type: String
    },
    state: {
        type: String
    },
    country: {
        type: String
    },
  },
  
  profilePhotos: [
    {
      url: {
        type: String
      },
      description: {
        type: String
      },
    },
  ],
 



  // createdBy field as an array of objects
  createdBy: [
    {
      admin: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
      fullnme: {
        type: String
      },
      email: {
        type: String
      },
      content: {
        type: String
      },
      timestamp: {
        type: Date,
        default: Date.now,
      },
    },
  ],
},
  //////// TIME STAMPS -- CREATED AT AND UPDATED //////
  { timestamps: true }
);

// Create the User model
const User = mongoose.model('User', userSchema);

module.exports = User;
