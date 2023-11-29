//newUpdateControllers.js

const mongoose = require('mongoose');
const { Post, Comment , Reply } = require('../models/NewsUpdates');
const User = require('../models/User');


// Create a Blog Post (Only for admin and moderator)
const createNews = async (req, res) => {
  try {
    const {
      title,
      content,
      author,
      featuredImage,
      isPopular,
      isTrending,
      featured,
      images,
    } = req.body;
    const { userId } = req.params; // Get the userId from the route params

    // Validate the post data.
    if (!title || !content) {
      return res.status(400).json({
        status: 'failed',
        message: 'Title and content are required fields.',
      });
    }

    // Fetch the user to check their role.
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        status: 'failed',
        message: 'User not found.',
      });
    }

    // Check if the user is an admin or moderator.
    if (!['isAdmin', 'isModerator'].includes(user.role)) {
      return res.status(403).json({
        status: 'failed',
        message: 'Only admin and moderator users can create blog posts.',
      });
    }

    // Create a new Post object with the post data.
    const post = new Post({
      title,
      content,
      author,
      featuredImage,
      isPopular,
      isTrending,
      featured,
      images,
      postedBy: userId, // Store the user ID of the creator
    });

    // Save the post to the database.
    await post.save();

    // Return the created post to the client.
    return res.status(201).json({
      status: 'success',
      message: 'Blog post created successfully.',
      post
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: 'error',
      message: 'An internal server error occurred.',
    });
  }
};



  

// Create a Comment on a Blog Post
const addCommentToPost = async (postId, commentText, userId) => {
  try {
    // Create a new comment document
    
   
const comment = new Comment({
      text: commentText,
      PostAuthor: postId, // Assuming you store the post ID in PostAuthor
      commentedBy: userId,
    });

    // Save the comment document to the database
    await comment.save();

    // Update the post document to include the new comment ID
    const post = await Post.findByIdAndUpdate(
      postId,
      {
        $push: {
          comments: comment._id,
        },
      },
      {
        new: true, // To return the updated post document
      }
    );

    return comment; // Return the created comment
  } catch (error) {
    // Handle errors, e.g., log the error or throw a custom error
    console.error(error);
    throw new Error('An error occurred while adding a comment to the post.');
  }
};





// Create a Reply to a Comment
const addReplyToComment = async (commentId, replyText, userId) => {
  try {
    const reply = new Reply({
      text: replyText,
      image: '', // Add the image if needed
      commentAuthor: userId,
      repliedBy: userId,
    });

    // Save the reply document to the database
    await reply.save();

    // Find the comment by ID and update the replies array
    const updatedComment = await Comment.findByIdAndUpdate(commentId, {
      $push: {
        replies: reply._id, // Push the reply's ID
      },
    });

    //console.log('Reply added successfully:', reply);

    // return updatedComment.replies; this is returning all the reply ids
     return reply; 
  } catch (error) {
    console.error('Error adding a reply to the comment:', error);
    throw new Error('An error occurred while adding a reply to the comment.');
  }
};








const getAllPosts = async () => {
  try {
    const posts = await Post.find()
      .populate({
        path: 'postedBy',
        select: 'fullname'
      })
      .populate({
        path: 'comments',
        populate: {
          path: 'commentedBy',
          select: 'fullname'
        }
      })
      .populate({
        path: 'comments.replies', // Correct path to populate replies within comments
        populate: {
          path: 'repliedBy',
          select: 'fullname'
        }
      })
      .exec();

    return posts;
  } catch (error) {
    console.error(error);
    throw new Error('An error occurred while fetching posts.');
  }
};



// controllers/newUpdateControllers.js

const updatePost = async (postId, updatedPostData) => {
  try {
    // Find the post by its ID and update it with the new data
    const updatedPost = await Post.findByIdAndUpdate(postId, updatedPostData, { new: true });

    if (!updatedPost) {
      throw new Error('Post not found.');
    }

    return updatedPost;
  } catch (error) {
    console.error(error);
    throw new Error('An error occurred while updating the post.');
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
    createNews,
    addCommentToPost,
    addReplyToComment,
    getAllPosts,
    updatePost,
 

  };

  module.exports = blogController;