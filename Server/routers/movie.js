const express = require("express");
const { isAuth, isAdmin } = require("../middleware/isAuth");
const { uploadVideo, uploadImage } = require("../middleware/multer");
const {
  uploadTrailer,
  createMovie,
  updateMovieWithoutPoster,
  updateMovieWithPoster,
  removeMovie,
} = require("../controllers/movie");
const { validate } = require("../models/user");
const { validateMovie } = require("../middleware/validator");
const { parseData } = require("../utils/helper");
const router = express.Router();

router.post(
  "/upload-trailer",
  // isAuth,
  // isAdmin,
  uploadVideo.single("video"),
  uploadTrailer
);
router.post(
  "/createMovie",
  // isAuth,
  // isAdmin,
  uploadImage.single("poster"),
  parseData,
  // validateMovie,
  // validate,
  createMovie
);

router.patch(
  "/update-movie-without-poster/:movieId",
  // isAuth,
  // isAdmin,
  // parseData,
  // validateMovie,
  // validate,
  updateMovieWithoutPoster
);
router.patch(
  "/update-movie-with-poster/:movieId",
  // isAuth,
  // isAdmin,
  uploadImage.single("poster"),
  parseData,
  // validateMovie,
  // validate,
  updateMovieWithPoster
);

router.delete("/:movieId",
  // isAuth,
  // isAdmin,
  removeMovie);
module.exports = router;
