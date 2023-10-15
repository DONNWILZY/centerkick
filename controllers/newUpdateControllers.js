const mongoose = require('mongoose');
const { Post, Comment } = require('../models/NewsUpdates');
const User = require('../models/User');


// Create a Blog Post (Only for admin and moderator)
const createBlogPost = async (req, res) => {
    const { title, content, author, publicationStatus,featuredImage, tags, summary, canonicalUrl, metaDescription , isPopular, isTrending, featured, images} = req.body;
    const userId = req.params.userId; // Get the userId from the route params 
    
    
  
    try {
      // Fetch the user to check their role
      const user = await User.findById(userId);
  
      if (!user) {
        return res.status(404).json({
          status: 'failed',
          message: 'User not found.',
        });
      }
  
      // Check if the user is an admin or moderator
      if (user.role !== 'isAdmin' && user.role !== 'isModerator') {
        return res.status(403).json({
          status: 'failed',
          message: 'Only admin and moderator can create blog posts.',
        });
      }
  
      const post = new Post({
        title,
        featuredImage,
        content,
        author,
        tags,
        summary,
        metaDescription,
        canonicalUrl,
        isPopular,
        isTrending,
        featured,        
        publicationStatus,
        images,
        postedBy: userId, // Store the user ID of the creator
      });
  
      await blog.save();
  
      return res.status(201).json({
        status: 'success',
        message: 'Blog post created successfully.',
        blog,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        status: 'failed',
        message: 'An error occurred while creating the blog post.',
      });
    }
  };
  

// Create a Comment on a Blog Post
const createComment = async (req, res) => {
  const { text } = req.body;
  const blogId = req.params.blogId; // ID of the blog post

  try {
    const comment = new Comment({
      text,
      PostAuthor: req.user.userId, // Store the user ID of the author of the blog post
      commentedBy: req.user.userId, // Reference to the user who commented
    });
    await comment.save();

    // Add the comment to the blog post's comments array
    const post = await Post.findById(blogId);
    if (!blog) {
      return res.status(404).json({
        status: 'failed',
        message: 'Blog post not found.',
      });
    }
    post.comments.push(comment);
    await post.save();

    return res.status(201).json({
      status: 'success',
      message: 'Comment created successfully.',
      comment,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: 'failed',
      message: 'An error occurred while creating the comment.',
    });
  }
};


// Create a Reply to a Comment
const createReply = async (req, res) => {
    const { text } = req.body;
    const commentId = req.params.commentId; // ID of the comment being replied to
  
    try {
      // Find the comment to which the reply belongs
      const comment = await Comment.findById(commentId);
      if (!comment) {
        return res.status(404).json({
          status: 'failed',
          message: 'Comment not found.',
        });
      }
  
      const reply = {
        text,
        author: req.user.userId, // Store the user ID of the reply creator
        comment, // Remove the 'comment' property
        post: comment.post, // Store the associated blog post ID
        repliedBy: req.user.userId, // Store the user who replied
      };
  
      // Add the reply to the replies array of the comment
      comment.replies.push(reply);
      await comment.save();
  
      // Get the newly created reply's _id
      const replyId = reply._id;
  
      // Return the reply and replyId in the response
      return res.status(201).json({
        status: 'success',
        message: 'Reply created successfully.',
        reply,
        replyId, // Include replyId in the response
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        status: 'failed',
        message: 'An error occurred while creating the reply.',
      });
    }
  };
  


const populateCommentsAndReplies = async (blogId, userId) => {
  try {
    // Get the blog post and populate comments
    const blogPost = await Blog.findById(blogId).populate({
      path: 'comments',
      populate: {
        path: 'replies',
        populate: {
          path: 'author',
        },
      },
    });

    // Populate the author of the blog post
    blogPost.postedBy = await User.findById(blogPost.postedBy);

    // Populate the authors of comments and their replies
    // for (const comment of blogPost.comments) {
    //   comment.author = await User.findById(comment.author);

    //   for (const reply of comment.replies) {
    //     reply.author = await User.findById(reply.author);
    //   }
    // }

    return blogPost;
   
  } catch (error) {
    // Handle errors
    console.error(error);
    throw error;
  }
};



  
///// blof post by id
const getBlogPostById = async (blogId) => {
  // Convert blogId to a string and then trim it to remove any leading/trailing whitespace
  const trimmedBlogId = String(blogId).trim();

  if (!mongoose.Types.ObjectId.isValid(trimmedBlogId)) {
    throw new Error('Invalid blogId. It must be a valid ObjectId.');
  }

  try {
    // Use findById to retrieve the blog post by its ObjectID
    const blogPost = await Blog.findById(trimmedBlogId)
      .populate('postedBy', 'username') // Populate the 'postedBy' field with username
      .populate({
        path: 'comments',
        populate: [
          { path: 'commentedBy', select: 'username' },
          {
            path: 'replies',
            populate: [
              { path: 'commentAuthor', select: 'username' },
              { path: 'repliedBy', select: 'username' },
            ],
          },
        ],
      });

    if (!blogPost) {
      // If the blog post is not found, you can throw an error or handle it accordingly
      throw new Error('Blog post not found');
    }

    return blogPost;
  } catch (error) {
    // Handle any errors that may occur during the query
    throw new Error(`Error fetching blog post: ${error.message}`);
  }
};

//// get all blogpost
const getAllBlogPosts = async () => {
  try {
    // Use the find method to retrieve all blog posts
    const blogPosts = await Blog.find()
      .populate('postedBy', 'username') // Populate the 'postedBy' field with the username
      .populate({
        path: 'comments',
        populate: [
          { path: 'commentedBy', select: 'username' },
          {
            path: 'replies',
            populate: [
              { path: 'commentAuthor', select: 'username' },
              { path: 'repliedBy', select: 'username' },
            ],
          },
        ],
      });

    return blogPosts;
  } catch (error) {
    // Handle any errors that may occur during the query
    throw new Error(`Error fetching blog posts: ${error.message}`);
  }
};







const blogController = {
    createBlogPost,
    createComment,
    getBlogPostById,
    createReply,
    populateCommentsAndReplies,
    getAllBlogPosts


  };

  module.exports = blogController;