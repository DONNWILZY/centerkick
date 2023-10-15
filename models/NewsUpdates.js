const mongoose = require('mongoose');

// Comment Schema
const commentSchema = new mongoose.Schema({
  objectId: {
    type: mongoose.Types.ObjectId,
    // required: true,
  },
  text: {
    type: String,
    required: true,
  },
  PostAuthor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  commentedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  replies: [
    {
      text: {
        type: String,
        required: true,
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
    },
  ],
}, { timestamps: true });

// Post Schema
const postSchema = new mongoose.Schema({
  objectId: {
    type: mongoose.Types.ObjectId,
    // required: true,
  },
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
  },
  featuredImage: {
    type: String,
  },
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Comment', // Reference the Comment schema
    },
],

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
    default: 'pending',
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
const statsSchema = new mongoose.Schema({
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

const Post = mongoose.model('Post', postSchema);
const Comment = mongoose.model('Comment', commentSchema);
const Stats = mongoose.model('Stats', statsSchema);

module.exports = { Post, Comment, Stats };
