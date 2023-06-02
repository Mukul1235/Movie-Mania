const cloudinary = require("../cloud/index");
const { sendError } = require("../utils/helper");
const Movie = require("../models/Movie");
const { isValidObjectId } = require("mongoose");

exports.uploadTrailer = async (req, res) => {
  const { file } = req;
  if (!file) return sendError(res, "Video file not found");

  const { secure_url: url, public_id } = await cloudinary.uploader.upload(
    file.path,
    {
      resource_type: "video",
    }
  );
  res.status(201).json({ url, public_id });
};

exports.createMovie = async (req, res) => {
  const { file, body } = req;
  const {
    title,
    storyline,
    director,
    releaseDate,
    status,
    type,
    genres,
    tags,
    casts,
    writers,
    trailer,
    languages,
    reviews,
  } = body;

  const newMovie = await Movie({
    title,
    storyline,
    releaseDate,
    status,
    type,
    genres,
    tags,
    casts,
    trailer,
    languages,
  });
  // console.log(newMovie);
  if (director) {
    if (!isValidObjectId(director))
      return sendError(res, "Invalid director Id");
    newMovie.director = director;
  }
  if (reviews) {
    for (let i in reviews) {
      if (!isValidObjectId(i)) return sendError(res, "Invalid user Id");
    }
    newMovie.reviews = reviews;
  }
  if (writers) {
    for (let i in writers) {
      if (!isValidObjectId(i)) return sendError(res, "Invalid writer Id");
    }
    newMovie.writers = writers;
  }
  // console.log(newMovie)
  console.log(file);

  const {
    secure_url: url,
    public_id,
    responsive_breakpoints,
  } = await cloudinary.uploader.upload(file.path, {
    Transformation: {
      width: 1280,
      height: 720,
    },
    responsive_breakpoints: {
      create_derived: true,
      max_width: 640,
      max_images: 3,
    },
  });
  const poster = { url, public_id, responsive: [] };
  const { breakpoints } = responsive_breakpoints[0];
  if (breakpoints.length) {
    for (let obj of breakpoints) {
      const { secure_url } = obj;
      poster.responsive.push(secure_url);
    }
  }
  newMovie.poster = poster;
  newMovie.save();
  // console.log(cloudRes);
  // console.log(cloudRes.responsive_breakpoints[0].breakpoints)
  res.status(201).json({
    id: newMovie._id,
    title,
  });
};

exports.updateMovieWithoutPoster = async (req, res) => {
  const { movieId } = req.params;
  if (!isValidObjectId(movieId)) return sendError(res, "Invalid Movie Id");
  const {
    title,
    storyline,
    director,
    releaseDate,
    status,
    type,
    genres,
    tags,
    casts,
    writers,
    trailer,
    languages,
    reviews,
  } = req.body;
  const newMovie = await Movie.findById(movieId);
  if (!newMovie) return sendError(res, "Movie not found", 404);
  newMovie.title = title;
  newMovie.storyline = storyline;
  newMovie.releaseDate = releaseDate;
  newMovie.status = status;
  newMovie.type = type;
  newMovie.genres = genres;
  newMovie.tags = tags;
  newMovie.casts = casts;
  newMovie.languages = languages;
  newMovie.trailer = trailer;

  if (director) {
    if (!isValidObjectId(director))
      return sendError(res, "Invalid director Id");
    newMovie.director = director;
  }
  if (reviews) { 
    for (let i in reviews) {
      if (!isValidObjectId(i)) return sendError(res, "Invalid user Id");
    }
    newMovie.reviews = reviews;
  }
  if (writers) {
    for (let i in writers) {
      if (!isValidObjectId(i)) return sendError(res, "Invalid writer Id");
    }
    newMovie.writers = writers;
  }
  await newMovie.save();

  res.json({ message: "Movie is updated", newMovie });
};

exports.updateMovieWithPoster = async (req, res) => {
  const { movieId } = req.params;
  const { file } = req;
  if (!file) return sendError(res, "No Poster found");
  if (!isValidObjectId(movieId)) return sendError(res, "Invalid Movie Id");
  const {
    title,
    storyline,
    director,
    releaseDate,
    status,
    type,
    genres,
    tags,
    casts,
    writers,
    trailer,
    languages,
    reviews,
  } = req.body;
  const newMovie = await Movie.findById(movieId);

  if (!newMovie) return sendError(res, "Movie not found", 404);
  newMovie.title = title;
  newMovie.storyline = storyline;
  newMovie.releaseDate = releaseDate;
  newMovie.status = status;
  newMovie.type = type;
  newMovie.genres = genres;
  newMovie.tags = tags;
  newMovie.casts = casts;
  newMovie.languages = languages;
  newMovie.trailer = trailer;

  const PosterId = newMovie.poster?.public_id;
  console.log(PosterId);
  if (PosterId) {
    const { result } = await cloudinary.uploader.destroy(PosterId);
    if (result !== "ok") {
      return sendError(res, "Could not poster at the movement!");
    }
  }
  const {
    secure_url: url,
    public_id,
    responsive_breakpoints,
  } = await cloudinary.uploader.upload(file.path, {
    Transformation: {
      width: 1280,
      height: 720,
    },
    responsive_breakpoints: {
      create_derived: true,
      max_width: 640,
      max_images: 3,
    },
  });
  const poster = { url, public_id, responsive: [] };
  const { breakpoints } = responsive_breakpoints[0];
  if (breakpoints.length) {
    for (let obj of breakpoints) {
      const { secure_url } = obj;
      poster.responsive.push(secure_url);
    }
  }
  newMovie.poster = poster;
  if (director) {
    if (!isValidObjectId(director))
      return sendError(res, "Invalid director Id");
    newMovie.director = director;
  }
  if (reviews) {
    for (let i in reviews) {
      if (!isValidObjectId(i)) return sendError(res, "Invalid user Id");
    }
    newMovie.reviews = reviews;
  }
  if (writers) {
    for (let i in writers) {
      if (!isValidObjectId(i)) return sendError(res, "Invalid writer Id");
    }
    newMovie.writers = writers;
  }
  await newMovie.save();

  res.json({ message: "Movie is updated", newMovie });
};

exports.removeMovie = async (req, res) => {
  const { movieId } = req.params;
  if (!isValidObjectId(movieId)) return sendError(res, "Invalid Movie Id");

  const newMovie = await Movie.findById(movieId);

  if (!newMovie) return sendError(res, "Movie not found", 404);
  //removing poster
  const poster = newMovie.poster?.public_id;
  if (poster) {
    const { result } = await cloudinary.uploader.destroy(poster);
    if (result !== "ok")
      return sendError(res, "Could not remove poster at the movement!");
  }
  const trailer = newMovie.trailer?.public_id;
  if (!trailer) return sendError(res, "Could not find trailer in cloud");
  const { result } = await cloudinary.uploader.destroy(trailer, {
    resource_type: "video",
  });
  if (result !== "ok")
    return sendError(res, "Could not remove trailer at the movement!");

  await Movie.findByIdAndDelete(movieId);

  res.json({ message: "Movie removed successfully" });
};
