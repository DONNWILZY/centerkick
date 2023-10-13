
const { body, validationResult } = require('express-validator');



  
  // Custom middleware to handle validation errors
  const handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // Return validation errors to the client
      return res.status(400).json({ errors: errors});
    }
    next();
  };
  
  module.exports = {
      handleValidationErrors,
  };
  