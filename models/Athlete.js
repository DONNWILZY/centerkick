const mongoose = require('mongoose');

// User Schema
const athleteSchema = new mongoose.Schema({
    fullname: {
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
    location: {
        type: String,
    },
    nationality: {
        type: String,
    },
    position: {
        type: [String],
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
    socialMedia: {
        type: [String]
    },
}, { timestamps: true });

// Stats Schema
const statsSchema = new mongoose.Schema({
    athlete: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Athlete',
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
    
    season: {
        type: String,
    },
    // ... other career stats fields ...
}, { timestamps: true });

// Create the Models
const Athlete = mongoose.model('Athlete', athleteSchema);
const Stats = mongoose.model('Stats', statsSchema);
const Transfer = mongoose.model('Transfer', transferSchema);
const NextMatch = mongoose.model('NextMatch', nextMatchSchema);
const CareerStat = mongoose.model('CareerStat', careerStatSchema);

module.exports = { Athlete, Stats, Transfer, NextMatch, CareerStat };
