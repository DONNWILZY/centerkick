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
  