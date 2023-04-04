const multer = require("multer");
const storage = multer.diskStorage({});

const fileFilterImage = (req, file, cb) => {
  //cb=>callback
  // console.log(file);
  if (!file.mimetype.startsWith("image")) {
    cb("Supported only image files", false);
  }
  cb(null, true); // cb(error,to proceed or not{boolean})
};
const fileFilterVideo = (req, file, cb) => {
  if (!file.mimetype.startsWith("video")) {
    cb("Supported only image files", false);
  }
  cb(null, true); // cb(error,to proceed or not{boolean})
};
exports.uploadImage = multer({ storage, fileFilter:fileFilterImage });
exports.uploadVideo = multer({ storage, fileFilter:fileFilterVideo });
