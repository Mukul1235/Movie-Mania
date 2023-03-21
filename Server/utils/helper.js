const crypto = require("crypto");

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


exports.handleNotfound = (req,res) => {
  this.sendError(res,'Not Found',404)
}