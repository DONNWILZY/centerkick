const { body, validationResult } = require('express-validator');
const {handleValidationErrors} = require('../validator/validate');

// Define validation rules for user registration
const registerValidator = [
    handleValidationErrors("firstName")
    .trim()
    .notEmpty()
    .withMessage("First Name is required")
    .isLength({ min: 5, max: 100 })
    .withMessage("First Name must be 2 to 31 characters long"),

  

    handleValidationErrors("phoneNumber").notEmpty().withMessage("Phone Number is required"),

    handleValidationErrors("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email format"),

    handleValidationErrors("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
];

// Define validation rules for user login
const loginValidator = [
    handleValidationErrors("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email format"),

    handleValidationErrors("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
];

module.exports = {
  registerValidator,
  loginValidator,
};
