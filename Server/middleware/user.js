const { isValidObjectId } = require("mongoose");
const passwordResetToken = require("../models/passwordResetToken");
const { sendError } = require("../utils/helper");

exports.isValidPasswordResetToken = async (req, res, next) => {
  try {
    const { token, userId } = req.body;

    if (!token.trim() || !isValidObjectId(userId))
      return sendError(res, "Invalid request");

    const resetToken = await passwordResetToken.findOne({ owner: userId });

    if (!resetToken)
      return sendError(res, "Unathorized access,Invalid request");

    const matched = await resetToken.compareToken(token);
    if (!matched) return sendError(res, "Unathorized access,Invalid request");

    req.resetToken = resetToken;

    next();
  } catch (error) {
    sendError(res, error.message);
  }
};
