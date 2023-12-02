const { News } = require('../models/News'); 
const User = require('../models/User');




// Create News
const createNews = async (req, res) => {
  try {
    const {
      title,
      content,
      author,
      date,
      tags,
      summary,
      featuredImage,
      metaDescription,
      canonicalUrl,
      isPopular,
      isTrending,
      featured,
      topStory,
      images,
    } = req.body;

    const { userId } = req.params; // Get the userId from the route params

    // Validate the post data.
    if (!title || !content || !author || !date) {
      return res.status(400).json({
        status: 'failed',
        message: 'Title, content, author, and date are required fields.',
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
        message: 'Only admin and moderator users can create news posts.',
      });
    }

    // Create a new News object with the post data.
    const newsPost = new News({
      title,
      content,
      author,
      date,
      tags,
      summary,
      featuredImage,
      metaDescription,
      canonicalUrl,
      isPopular,
      isTrending,
      featured,
      topStory,
      images,
      postedBy: userId, // Store the user ID of the creator
    });

    // Save the news post to the database.
    await newsPost.save();

    // Return the created news post to the client.
    return res.status(201).json({
      status: 'success',
      message: 'News post created successfully.',
      newsPost,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: 'error',
      message: 'An internal server error occurred.',
    });
  }
};

// Update News
const updateNews = async (req, res) => {
  try {
    const { userId } = req.params;
    const { newsId } = req.params;
    const updateData = req.body;

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
        message: 'Only admin and moderator users can update news posts.',
      });
    }

    // Find the existing news post by ID.
    const existingNewsPost = await News.findById(newsId);

    if (!existingNewsPost) {
      return res.status(404).json({
        status: 'failed',
        message: 'News post not found.',
      });
    }

    // Validate and update the news post fields.
    Object.keys(updateData).forEach((key) => {
      existingNewsPost[key] = updateData[key];
    });

    // Save the updated news post.
    await existingNewsPost.save();

    // Return the updated news post to the client.
    return res.status(200).json({
      status: 'success',
      message: 'News post updated successfully.',
      newsPost: existingNewsPost,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: 'error',
      message: 'An internal server error occurred.',
    });
  }
};

const deleteNews = async (req, res) => {
  try {
    const { userId } = req.params;
    const { newsId } = req.params;

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
        message: 'Only admin and moderator users can delete news posts.',
      });
    }

    // Find the existing news post by ID.
    const existingNewsPost = await News.findById(newsId);

    if (!existingNewsPost) {
      return res.status(404).json({
        status: 'failed',
        message: 'News post not found.',
      });
    }

    // Delete the news post.
    await existingNewsPost.remove();

    // Return a success message.
    return res.status(200).json({
      status: 'success',
      message: 'News post deleted successfully.',
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: 'error',
      message: 'An internal server error occurred.',
    });
  }
};


// Get All News
const getAllNews = async (req, res) => {
  try {
    // Fetch all news posts from the database.
    const allNews = await News.find();

    // Return the array of news posts in the response.
    return res.status(200).json({
      status: 'success',
      message: 'All news posts retrieved successfully.',
      news: allNews,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: 'error',
      message: 'An internal server error occurred.',
    });
  }
};

const getSingleNews = async (req, res) => {
  try {
    const { newsId } = req.params;

    // Fetch the single news post from the database based on its ID.
    const singleNews = await News.findById(newsId);

    if (!singleNews) {
      return res.status(404).json({
        status: 'failed',
        message: 'News post not found.',
      });
    }

    // Return the single news post in the response.
    return res.status(200).json({
      status: 'success',
      message: 'Single news post retrieved successfully.',
      news: singleNews,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: 'error',
      message: 'An internal server error occurred.',
    });
  }
};


// Get Trending News
const getTrending = async (req, res) => {
  try {
    // ... (Implement getTrending logic)
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: 'error',
      message: 'An internal server error occurred.',
    });
  }
};

// Get Top Story
const getTopStory = async (req, res) => {
  try {
    const news = await News.findOne({
      topStory: true,
    });

    if (news) {
      return res.status(200).json({
        status: 'success',
        news,
      });
    } else {
      return res.status(404).json({
        status: 'error',
        message: 'Top story not found.',
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: 'error',
      message: 'An internal server error occurred.',
    });
  }
};

// Get Newest (Latest) News
const getNewest = async (req, res) => {
  try {
    const news = await News.find({
      publicationStatus: 'approved',
    }).sort({
      date: -1,
    }).limit(10);

    if (news) {
      return res.status(200).json({
        status: 'success',
        news,
      });
    } else {
      return res.status(404).json({
        status: 'error',
        message: 'No news found.',
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: 'error',
      message: 'An internal server error occurred.',
    });
  }
};

// pOPULAR  News (assuming you want to populate some referenced fields)
const getPopular = async (req, res) => {
  try {
    const news = await News.find({
      isPopular: true,
      publicationStatus: 'approved',
    }).sort({
      date: -1,
    }).limit(10);

    if (news) {
      return res.status(200).json({
        status: 'success',
        news,
      });
    } else {
      return res.status(404).json({
        status: 'error',
        message: 'No popular news found.',
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: 'error',
      message: 'An internal server error occurred.',
    });
  }
};




module.exports = {
  createNews,
  updateNews,
  deleteNews,
  getAllNews,
  getSingleNews,
  getTrending,
  getTopStory,
  getNewest,
  getPopular,
  getTrending
};
