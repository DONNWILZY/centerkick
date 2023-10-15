const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  objectId: {
    type: mongoose.Types.ObjectId,
    //required: true,
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
      // post: {
      //   type: mongoose.Schema.Types.ObjectId,
      //   ref: 'Blog',
      //  required: true,
      // },
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
        type: mongoose.Schema.Types.ObjectId, // Reference to the User model
        ref: 'User', // Reference the 'User' model
        //required: true,
      },

      repliedBy: {
        type: mongoose.Schema.Types.ObjectId, // Reference to the User model
        ref: 'User', // Reference the 'User' model
        //required: true,
      },

         date: {
        type: Date,
        default: Date.now,
      },
       reactions: [reactionSchema], 
    },
  ],
},
//////// TIME STAMPS -- CREATED AT AND UPDATED //////
{ timestamps: true }
);

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
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Comment',
    },
  ],
//   likes: {
//     type: Number,
//   },
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

  // Other blog fields (if any)
},
//////// TIME STAMPS -- CREATED AT AND UPDATED //////
{ timestamps: true }

);


const Post = mongoose.model('Post', postSchema);
const Comment = mongoose.model('Comment', commentSchema);

module.exports = { Post, Comment };
