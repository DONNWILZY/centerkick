const express = require('express');
const router = express.Router();
const { 
    createNews, 
    addCommentToPost, 
    addReplyToComment, 
    getAllPosts, 
    updatePost  
} = require('../controllers/newUpdateControllers');
const {verifyToken, verifyUser, verifyAdmin, verifyModerator} = require('../middlewares/UserAuth')


router.post('/createNews/:userId', createNews);

// router.post('/comment/:blogId', verifyToken, verifyAdmin || verifyModerator, AddComment);

// Express route to create a comment on a blog post
router.post('/comment/:postId', verifyToken, verifyAdmin || verifyModerator, async (req, res) => {
    try {
      const { postId } = req.params;
      const { text } = req.body;
      const { userId } = req.user; // Assuming userId is available in the request
  
      // Call the 'addCommentToPost' function to add the comment to the post and return the created comment
      const createdComment = await addCommentToPost(postId, text, userId);
  
      return res.status(201).json({
        status: 'success',
        message: 'Comment added successfully.',
        comment: createdComment, // Return the created comment
      });
    } catch (error) {
      return res.status(500).json({
        status: 'error',
        message: 'An error occurred while adding a comment to the post.',
      });
    }
  });
  

  router.post('/replycomment/:commentId', verifyToken, verifyAdmin || verifyModerator, async (req, res) => {
    try {
      const { commentId } = req.params;
      const { text } = req.body;
      const { userId } = req.user;
  
      const replies = await addReplyToComment(commentId, text, userId);
  
      return res.status(201).json({
        status: 'success',
        message: 'Reply added successfully.',
        replies: replies, // Returning the replies
      });
    } catch (error) {
      return res.status(500).json({
        status: 'error',
        message: 'An error occurred while adding a reply to the comment.',
      });
    }
  });
  

//   router.get('/posts', getAllPosts);

router.get('/posts', async (req, res) => {
    try {
      const posts = await getAllPosts();
      return res.status(200).json({ status: 'success', data: posts });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ status: 'error', message: 'An error occurred while fetching posts.' });
    }
  });
  

// Update a specific post
// router.put('/post/:postId', verifyToken, verifyAdmin || verifyModerator, async (req, res) => {
//     try {
//       const { postId } = req.params;
//       const updatedPostData = req.body;
  
//       const updatedPost = await updatePost(postId, updatedPostData);
  
//       res.status(200).json({
//         status: 'success',
//         message: 'Post updated successfully.',
//         post: updatedPost,
//       });
//     } 



module.exports = router;