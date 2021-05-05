const express = require("express");
const router = express.Router();

// Load Controllers
const {
  activationController,
  signinController,
  forgotPasswordController,
  resetPasswordController,
  googleController,
  facebookController,
  registerController,
} = require("../controllers/auth.controller");

// Call Validations
const {
  validSign,
  validLogin,
  forgotPasswordValidator,
  resetPasswordValidator,
} = require("../helpers/valid");

router.post("/register", validSign, registerController);

router.post("/login", validLogin, signinController);

// activating account after registration.
router.post("/activation", activationController);

// forgot reset password
router.put(
  "/forgotpassword",
  forgotPasswordValidator,
  forgotPasswordController
);
router.put("/resetpassword", resetPasswordValidator, resetPasswordController);

// Google and Facebook Login
router.post("/googlelogin", googleController);
router.post("/facebooklogin", facebookController);

module.exports = router;