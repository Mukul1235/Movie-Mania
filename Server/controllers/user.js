const User = require("../models/user");
const EmailVerificationToken = require("../models/emailVerificationToken");
const passwordResetToken = require("../models/passwordResetToken");
const nodemailer = require("nodemailer");
const { isValidObjectId } = require("mongoose");
const { generateOTP, generateMailTransporter } = require("../utils/mail");
const { sendError, generateRandomByte } = require("../utils/helper");
const jwt = require("jsonwebtoken");
const router = require("../routers/user");

exports.CreateUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const x = await User.findOne({ email });
    if (x) {
      return sendError(res, "User Already Exists");
    }

    const user = await new User({ name, email, password });
    user.save();

    //generate 6 digit otp
    let OTP = generateOTP();

    //store otp in out db
    const EmailVerificationToken1 = new EmailVerificationToken({
      owner: user._id,
      token: OTP,
    });
    await EmailVerificationToken1.save();
    //send that otp to our user
    var transport = generateMailTransporter();

    console.log(OTP);
    transport.sendMail({
      from: "verification@reviewapp.com",
      to: user.email,
      subject: "Email Verification",
      html: `
        <p>Your verification OTP</p>
        <h1>${OTP}</h1>
        `,
    });
    res.status(201).json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    sendError(res, error.message);
  }
};

exports.verifyEmail = async (req, res) => {
  try {
    const { userId, OTP } = req.body;
    if (!isValidObjectId(userId)) {
      return res.json({ error: "Invalid User!" });
    }
    const user = await User.findById(userId);
    if (!user) return sendError(res, "user not found", 404);

    if (user.isVerified) return sendError(res, "user is already verified");

    const token = await EmailVerificationToken.findOne({ owner: userId });

    if (!token) return sendError(res, "token not found");

    const isMatched = await token.compareToken(OTP);

    if (!isMatched) return sendError(res, "Please submit a valid OTP");
    user.isVerified = true;
    await user.save();

    EmailVerificationToken.findByIdAndDelete(token._id);
    var transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: process.env.MAIL_TRAP_USER,
        pass: process.env.MAIL_TRAP_PASSWORD,
      },
    });
    transport.sendMail({
      from: "verification@reviewapp.com",
      to: user.email,
      subject: "Welcome Email ",
      html: `
      <h1>Welcome to our app and thanks for choosing us.</h1>
      `,
    });
    const jwtToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7h",
    });

    res.json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        token: jwtToken,
        isVerified: user.isVerified,
      },
      message: "Your email is verified",
    });
  } catch (error) {
    sendError(res, error.message);
  }
};

exports.resendEmailVerification = async (req, res) => {
  try {
    const { userId } = req.body;
    const user = await User.findById(userId);
    if (!user) return sendError(res, "user not found");

    if (user.isVerified)
      return sendError(res, "This email id is already verified");

    const alreadyhastoken = await EmailVerificationToken.findOne({
      owner: userId,
    });
    if (alreadyhastoken)
      return sendError(
        res,
        "Only after one hour you can requrest for another token!"
      );

    //6digit otp
    let OTP = generateOTP();

    //store otp in out db
    const EmailVerificationToken1 = new EmailVerificationToken({
      owner: userId,
      token: OTP,
    });
    await EmailVerificationToken1.save();

    //send that otp to our user
    var transport = generateMailTransporter();
    transport.sendMail({
      from: "verification@reviewapp.com",
      to: user.email,
      subject: "Email Verification",
      html: `
        <p>Your verification OTP</p>
        <h1>${OTP}</h1>
        `,
    });
    res.status(201).json({
      message: "Please verify your email.OTP has been sent to your email!",
    });
  } catch (error) {
    sendError(res, error.message);
  }
};

exports.forgetPassword = async (req, res) => {
  try {
    const { email } = req.body;
    // console.log(email)
    if (!email) return sendError(res, "email is missing");
    const user = await User.findOne({ email });
    if (!user) return sendError(res, "user not found", 404);
    const alreadyHasToken = await passwordResetToken.findOne({
      owner: user._id,
    });

    if (alreadyHasToken)
      return sendError(
        res,
        "Only after one hour you can request for another token!"
      );
    const token = await generateRandomByte();
    const newPasswordResetToken = await passwordResetToken({
      owner: user._id,
      token: token,
    });
    await newPasswordResetToken.save();

    const resetPasswordUrl = `http://localhost:3000/auth/reset-password?token=${token}&id=${user._id}`;
    // console.log(token)
    // console.log(user._id)

    var transport = generateMailTransporter();
    transport.sendMail({
      from: "security@reviewapp.com",
      to: user.email,
      subject: "Reset Password Link",
      html: `
      <p>Click here to reset password</p>
      <a href='${resetPasswordUrl}'>Change Password</a>
      `,
    });
    res.json({ message: "link sent to your email!" });
  } catch (error) {
    sendError(res, error.message);
  }
};

exports.sendResetPasswordTokenStatus = (req, res) => {
  res.json({ valid: true });
};

exports.resetPassword = async (req, res) => {
  try {
    const { newPassword, userId } = req.body;
    const user = await User.findById(userId);
    const matched = await user.comparePassword(newPassword);
    if (matched)
      return sendError(
        res,
        "The new password must be different from the old password"
      );
    user.password = newPassword;
    await user.save();
    await passwordResetToken.findByIdAndDelete(req.resetToken._id); // coming from middleware

    const transport = generateMailTransporter();
    transport.sendMail({
      from: "security@reviewapp.com",
      to: user.email,
      subject: "Password Reset Successfully",
      html: `
      <h1>Password Reset Successfully</h1>
      <p>Now you can use new password.</p>
      `,
    });
    res.json({
      message: "Password Reset Successfully,now you can use new password.",
    });
  } catch (error) {
    sendError(res, error.message);
  }
};

exports.signIn = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email: email });
  if (!user) return sendError(res, "Email/Password mismatch!");

  const matched = await user.comparePassword(password);
  if (!matched) return sendError(res, "Password/Email mismatch!");

  const { _id, name, isVerified } = user;
  const jwtToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
    expiresIn: "7h",
  }); // 7 hr

  res.json({ user: { id: _id, name, email, token: jwtToken, isVerified } });
};

// exports.verifyToken = async (req, res) => {
//   const token = req.headers?.token;
//   if (!token) sendError(res, "Invalid token");
//   const jwtToken = token.split("Bearer ")[1];
//   const jwt1 = jwt.verify(jwtToken, process.env.JWT_SECRET);
//   console.log(jwt1);

// };
