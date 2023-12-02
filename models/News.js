const mongoose = require('mongoose');

const newsSchema = new mongoose.Schema({
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
    topStory: {
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
  
  const News = mongoose.model('News', newsSchema);
  module.exports = { News };
  