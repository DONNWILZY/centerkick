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
  replies: [replySchema], 

}, { timestamps: true });

// Post Schema
const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  category: {
    type: String,
  },
  tags: {
    type: [String],
  },
  summary: {
    type: String,
  },
  content: {
    type: String,
    required: true,
  },
  featuredImage: {
    type: String,
  },

  comments: [commentSchema], 

  views: {
    type: Number,
  },
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
  isTrending: {
    type: Boolean,
  },
  dateTime: {
    type: Date,
    default: Date.now,
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
