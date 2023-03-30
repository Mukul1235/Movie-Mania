const cloudinary = require("cloudinary").v2;

// Configuration
cloudinary.config({
  cloud_name: "djo2f05vr",
  api_key: "967831193521544",
  api_secret: "Ba2cG78Mewj0rdF8Q_QaGPvfPFo",
  secure: true,
});

module.exports = cloudinary;