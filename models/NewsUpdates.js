///NewsUpdates.js
const mongoose = require('mongoose');

// Reply Schema
const replySchema = new mongoose.Schema({
  text: {
    type: String,
    // required: true,
  },
  image: {
    type: String,
    // required: true,
  },
  commentAuthor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    // required: true,
  },
  repliedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    // required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
}, { timestamps: true });

// Comment Schema
const commentSchema = new mongoose.Schema({
  text: {
    type: String,
    // required: true,
  },
  PostAuthor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    //required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  commentedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    //required: true,
  },
  // replies: [replySchema], 
  replies: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Reply' // Correct reference to the Reply model
    }
  ],

}, { timestamps: true });

// Post Schema
const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
 
  tags: {
    type: [String],
  },

  summary: {
    type: String,
  },
 
  featuredImage: {
    type: String,
  },

  comments: [commentSchema], 


  metaDescription: {
    type: String,
  },

  canonicalUrl: {
    type: String,
  },

  publicationStatus: {
    type: String,
    enum: ['approved', 'declined', 'pending'],
    default: 'approved',
  },

  featured: {
    type: Boolean,
  },

  sticky: {
    type: Boolean,
  },

  isPopular: {
    type: Boolean,
  },

  topStory:{
  type: Boolean,
  },

  isTrending: {
    type: Boolean,
  },

  date: {
    type: Date,
    default: Date.now,
  },
  images: [
    {
      url: {
        type: String,
        required: true,
      },
      caption: {
        type: String,
      },
    },
  ],
 
  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
}, { timestamps: true });


// Statistics Schema
const allStatsSchema = new mongoose.Schema({
  postStats: {
    totalPosts: {
      type: Number,
      default: 0,
    },
    // Add more statistics fields for posts if needed
  },
  commentStats: {
    totalComments: {
      type: Number,
      default: 0,
    },
    // Add more statistics fields for comments if needed
  },
  replyStats: {
    totalReplies: {
      type: Number,
      default: 0,
    },
    // Add more statistics fields for replies if needed
  },
}, { timestamps: true });

const Reply = mongoose.model('Reply', replySchema);
const Post = mongoose.model('Post', postSchema);
const Comment = mongoose.model('Comment', commentSchema);
const AllStats = mongoose.model('AllStats', allStatsSchema);

module.exports = { Reply, Post, Comment, AllStats };
