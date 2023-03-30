const express = require("express");
const {
  CreateUser,
  verifyEmail,
  resendEmailVerification,
  forgetPassword,
  sendResetPasswordTokenStatus,
  resetPassword,
  signIn,
  verifyToken,
} = require("../controllers/user");
const { userValidator, validate, validatePassword, signInValidator } = require("../middleware/validator");
const { isValidPasswordResetToken } = require("../middleware/user");
const { isAuth, isAdmin } = require("../middleware/isAuth");
const router = express.Router();

router.post("/create", userValidator, validate, CreateUser);
router.post("/verify-email", verifyEmail);
router.post("/resend-email-verification-token", resendEmailVerification);
router.post("/forget-password", forgetPassword);
router.post(
  "/verify-pass-reset-token",
  isValidPasswordResetToken,
  sendResetPasswordTokenStatus
);
router.get("/isAuth", isAuth)
router.post("/reset-password", validatePassword, validate, isValidPasswordResetToken, resetPassword)

router.post("/sign-In", signInValidator, validate, signIn);

module.exports = router;
