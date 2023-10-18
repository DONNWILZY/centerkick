//newUpdateControllers.js

const mongoose = require('mongoose');
const { Post, Comment } = require('../models/NewsUpdates');
const User = require('../models/User');


// Create a Blog Post (Only for admin and moderator)
const createNews = async (req, res) => {
  try {
    const {
      title,
      content,
      author,
      publicationStatus,
      featuredImage,
      tags,
      summary,
      canonicalUrl,
      metaDescription,
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

    // Save the post to the database.
    await post.save();

    // Return the created post to the client.
    return res.status(201).json({
      status: 'success',
      message: 'Blog post created successfully.',
      post,
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
// Create a Comment on a Blog Post and return the created comment
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
    const reply = {
      text: replyText,
      image: '', // Add the image if needed
      commentAuthor: userId,
      repliedBy: userId,
    };

    // Find the comment by ID and update the replies array
    await Comment.findByIdAndUpdate(commentId, {
      $push: {
        replies: reply,
      },
    });

    // Find the updated comment
    const updatedComment = await Comment.findById(commentId);

    return updatedComment;
  } catch (error) {
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
        path: 'comments.replies', // Populate the 'replies' field within comments
        populate: {
          path: 'repliedBy', // Populate the 'repliedBy' field in replies
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


async function getAllPostss() {
  // Get all posts
  const posts = await Post.find().populate('comments');

  // Populate the comments with replies
  for (const post of posts) {
    for (const comment of post.comments) {
      await comment.populate('replies');
    }
  }

  return posts;
}






  


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
    createNews,
    addCommentToPost,
    getAllPosts,
    getBlogPostById,
    addReplyToComment,
    populateCommentsAndReplies,
    getAllBlogPosts


  };

  module.exports = blogController;