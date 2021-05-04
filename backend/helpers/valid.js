// Validations helpers
const { check } = require("express-validator");

// Register
exports.validSign = [
  check("FullName", "Name is required")
    .notEmpty()
    .isLength({
      min: 4,
      max: 32,
    })
    .withMessage("name must be between 3 to 32 characters"),
  check("email")
    .isEmail()
    // The normalizeEmail() method helps to convert the emails entered into the standard approved format. This means if a user enters, for example, username@googlemail.com, it will be canonicalised to username@gmail.com.
    .normalizeEmail()
    .withMessage("Must be a valid email address"),
  check("password", "password is required").notEmpty(),
  check("password")
    .isLength({
      min: 8,
    }).matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/, "i")
    .withMessage(
      "Password must include one lowercase character, one uppercase character, a number, and a special character."
    ),
  check("Gender")
    .notEmpty()
    .withMessage("Gender field cannot be empty")
    .isIn(['Male', 'Female'])
    .withMessage("Gender field must be Male or female."),
  check("city")
    .notEmpty()
    .withMessage("City field cannot be empty")
    .matches(/^[a-zA-Z\s]*$/)
    .withMessage("City contains only letters"),
  check("Phone").isMobilePhone(),
];

// Login
exports.validLogin = [
  check("email").isEmail().withMessage("Must be a valid email address"),
  check("password", "password is required").notEmpty(),
  check("password")
  .isLength({
    min: 8,
  }).matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/, "i")
  .withMessage(
    "Password must include one lowercase character, one uppercase character, a number, and a special character."
  ),
];

// Forget Password
exports.forgotPasswordValidator = [
  check("email")
    .not()
    .isEmpty()
    .isEmail()
    .withMessage("Must be a valid email address"),
];

// Reset password
exports.resetPasswordValidator = [
  check("newPassword")
    .isLength({
      min: 8,
    }).matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/, "i")
    .withMessage(
      "Password must include one lowercase character, one uppercase character, a number, and a special character."
    )
];
