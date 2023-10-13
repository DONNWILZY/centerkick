const { check } = require("express-validator");

// Define validation rules for user registration
const registerValidator = [
  check("firstName")
    .trim()
    .notEmpty()
    .withMessage("First Name is required")
    .isLength({ min: 5, max: 100 })
    .withMessage("First Name must be 2 to 31 characters long"),

  

  check("phoneNumber").notEmpty().withMessage("Phone Number is required"),

  check("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email format"),

  check("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
];

// Define validation rules for user login
const loginValidator = [
  check("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email format"),

  check("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
];

module.exports = {
  registerValidator,
  loginValidator,
};
