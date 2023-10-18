// Update the 'addCommentToPost' function to return just the comment

  
  // Modify the route to return the comment in the response
  router.post('/comment/:blogId', verifyToken, verifyAdmin || verifyModerator, async (req, res) => {
    try {
      const { blogId } = req.params; // Assuming 'blogId' is the parameter for the post ID
      const { text } = req.body;
      const { userId } = req.user; // Assuming userId is available in the request
  
      // Call the 'addCommentToPost' function to add the comment to the post
      const comment = await addCommentToPost(blogId, text, userId);
  
      return res.status(201).json({
        status: 'success',
        message: 'Comment added successfully.',
        comment, // Return the comment in the response
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
  
      const updatedComment = await addReplyToComment(commentId, text, userId);
  
      return res.status(201).json({
        status: 'success',
        message: 'Reply added successfully.',
        comment: updatedComment,
      });
    } catch (error) {
      return res.status(500).json({
        status: 'error',
        message: 'An error occurred while adding a reply to the comment.',
      });
    }
  });

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