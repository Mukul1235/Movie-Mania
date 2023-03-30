const crypto = require("crypto");
const cloudinary = require("../cloud/index");

exports.sendError = (res, error, statusCode = 401) => {
  res.status(statusCode).json({ error });
};

exports.generateRandomByte = () => {
  return new Promise((resolve, reject) => {
    crypto.randomBytes(30, (err, buff) => {
      if (err) reject;
      const bufferString = buff.toString("hex");
      console.log(bufferString);
      resolve(bufferString);
    });
  });
};

exports.handleNotfound = (req, res) => {
  this.sendError(res, "Not Found", 404);
};

exports.uploadImageToCloud = async (file) => {
  const { secure_url: url, public_id } = await cloudinary.uploader.upload(
    file.path,
    {
      gravity: "face",
      height: 500,
      width: 500,
      crop: "thumb",
    }
  );
  return { url, public_id };
};

exports.formatActor = (actor) => {
  const { name, gender, about, _id, avtar } = actor;
  return {
    id: _id,
    name,
    about,
    gender,
    avtar: avtar?.url,
  };
};
