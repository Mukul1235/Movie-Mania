const User = require("../models/user");
const { sendError } = require("../utils/helper");
const jwt = require("jsonwebtoken");

// exports.isAuth = async (req, res) => {
//   const token = req.headers?.token;
//   if (!token) sendError(res, "Invalid token");
//     const jwtToken = token.split("Bearer ")[1];
//     if(!jwtToken) return sendError(res, "Invalid token");
//     // console.log(jwtToken)
//     const decode = jwt.verify(jwtToken, process.env.JWT_SECRET);
//     console.log(decode);
//     console.log(decode)
//     const { userId } = decode;
//     console.log(userId)
//   const user1 = await User.findById(userId);
//   if (!user1) return sendError(res, "Invalid token user not found!", 404);
//   req.user = user1;
// //   next();
// };

exports.isAuth = async (req, res, next) => {
  const token = req.headers?.token;

  if (!token) return sendError(res, "Invalid token!");
  const jwtToken = token.split("Bearer ")[1];

  if (!jwtToken) return sendError(res, "Invalid token!");
  const decode = jwt.verify(jwtToken, process.env.JWT_SECRET);
  const { userId } = decode;

  const user = await User.findById(userId);
  if (!user) return sendError(res, "unauthorized access!");

  req.user = user;

  next();
};


exports.isAdmin = async (req, res, next) => {
  const { user } = req;
  if (user.role != "admin") return sendError(res, "unauthorized access");
  next();
};
