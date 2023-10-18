const mongoose = require('mongoose');

// User Schema
const athleteSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    name: {
        type: String,
    }, 

    bio: {
        type: String,
        required: true,
    },
    dob: {
        type: Date,
    },
    age:{
        type: Number
    },
    placeOfBirth:{
        type: String
    },
    location: {
        type: String,
    },
    nationality: {
        type: String,
    },
    position: {
        type: String,
    },
    otherPosition:{
        type: String,
    },
    yearJoined: {
        type: Date,
    },
    Honours: {
        type: [String],
    },
    height: {
        type: String,
    },
    weight: {
        type: String,
    },
    citizenship: {
        type: String,
    },
    gender: {
        type: String,
        enum: ['male', 'female', 'other'],
    },
    agent: {
        type: String,
    },
    foot: {
        type: String,
    },
    CoverPhoto: {
        type: String,
    },
    currentClub: {
        Name: {
            type: String
        },
        dateJoined: {
            type: String
        },
        contractExpires: {
            type: String
        },
        salary: {
            type: String
        },
    },
    currentSalary: {
        type: String,
    },
    images: [
        {
            url: {
                type: String
            },
            description: {
                type: String
            },
        },
    ],
    socialMedia: [
        {
            name: {
                type: String,
                required: true,
            },
            link: {
                type: String,
                required: true,
            },
        },
    ],
}, { timestamps: true });


// Stats Schema
const statsSchema = new mongoose.Schema({
    athlete: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Athlete',
    },

     user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },

    date: {
        type: Date,
    },
    stats: {
        appearances: {
            type: String
        },
        // ... other stats fields ...
    },
}, { timestamps: true });

// Transfer Schema
const transferSchema = new mongoose.Schema({
    athlete: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Athlete',
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    season: {
        type: String,
    },
    date: {
        type: Date,
    },
    left: {
        type: String,
    },
    joined: {
        type: Date,
    },
    free: {
        type: Number,
    },
}, { timestamps: true });

// Next Match Schema
const nextMatchSchema = new mongoose.Schema({
    athlete: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Athlete',
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    
    date: {
        type: String,
    },
    league: {
        type: String,
    },
    club: {
        type: String,
    },
    vs: {
        type: String,
    },
    time: {
        type: String,
    },
    bet: {
        odd: {
            oneX: {
                type: String
            }
        },
    },
}, { timestamps: true });

// Career Stat Schema
const careerStatSchema = new mongoose.Schema({
    athlete: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Athlete',
    },

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    
    season: {
        type: String,
    },
    // other career stats fields 
}, { timestamps: true });

// Pre-save hook to calculate age from schema and store in age
athleteSchema.pre('save', function(next) {
    const today = new Date();
    const age = today.getFullYear() - this.dob.getFullYear() - ((today.getMonth() < this.dob.getMonth()) || (today.getMonth() === this.dob.getMonth() && today.getDate() < this.dob.getDate()));
    this.age = age;
    next();
    console.log(age);/// remove later
  });

 

// Create the Models
const Athlete = mongoose.model('Athlete', athleteSchema);
const Stats = mongoose.model('Stats', statsSchema);
const Transfer = mongoose.model('Transfer', transferSchema);
const NextMatch = mongoose.model('NextMatch', nextMatchSchema);
const CareerStat = mongoose.model('CareerStat', careerStatSchema);

module.exports = { Athlete, Stats, Transfer, NextMatch, CareerStat };
