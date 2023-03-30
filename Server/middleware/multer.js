const multer = require("multer");
const storage = multer.diskStorage({});

const fileFilter = (req, file, cb) => {
  //cb=>callback
  // console.log(file);
  if (!file.mimetype.startsWith("image")) {
    cb("Supported only image files", false);
  }
  cb(null, true); // cb(error,to proceed or not{boolean})
};
exports.uploadImage = multer({ storage, fileFilter });
