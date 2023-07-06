const cloudinary = require("../cloud/index");
const Movie = require("../models/Movie");
const Review = require("../models/review");
const {
  sendError,
  formatActor,
  averageRatingPipeline,
  relatedMovieAggregation,
  getAverageRatings,
  topRatedMoviesPipeline,
} = require("../utils/helper");
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

  // console.log(req.body);
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
  // console.log(writers)
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
    // for (let i in writers) {
    //   if (!isValidObjectId(i)) return sendError(res, "Invalid writer Id");
    // }
    newMovie.writers = writers;
  }
  // console.log(newMovie)
  // console.log(file);

  //uploading poster
  if (file) {
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
  }
  console.log(newMovie);
  newMovie.save();
  // console.log(cloudRes);
  // console.log(cloudRes.responsive_breakpoints[0].breakpoints)
  res.status(201).json({
    movie: {
      id: newMovie._id,
      title,
    },
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
  if (trailer) newMovie.trailer = trailer;
  if (director) {
    if (!isValidObjectId(director))
      return sendError(res, "Invalid director id!");
    newMovie.director = director;
  }

  if (writers) {
    for (let writerId of writers) {
      //   if (!isValidObjectId(writerId))
      //     return sendError(res, "Invalid writer id!");
    }

    newMovie.writers = writers;
  }

  const PosterId = newMovie.poster?.public_id;
  // console.log(PosterId);
  // if (PosterId) {
  //   const { result } = await cloudinary.uploader.destroy(PosterId);
  //   if (result !== "ok") {
  //     return sendError(res, "Could not poster at the movement!");
  //   }
  // }
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
  if (reviews) {
    for (let i in reviews) {
      if (!isValidObjectId(i)) return sendError(res, "Invalid user Id");
    }
    newMovie.reviews = reviews;
  }
  console.log(newMovie);
  await newMovie.save();

  res.json({
    message: "Movie is updated",
    movie: {
      id: newMovie._id,
      title: newMovie.title,
      poster: newMovie.poster?.url,
      genres: newMovie.genres,
      status: newMovie.status,
    },
  });
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

exports.getMovies = async (req, res) => {
  const { pageNo, limit } = req.query;
  const movies = await Movie.find({})
    .limit(parseInt(limit))
    .sort({ createdAt: -1 })
    .skip(parseInt(limit) * parseInt(pageNo));
  const results = movies.map((movie) => ({
    id: movie._id,
    title: movie.title,
    poster: movie.poster?.url,
    responsivePosters: movie.poster?.responsive,
    genres: movie.genres,
    status: movie.status,
  }));
  // const profiles = movies.map((movie) => formatActor(movie));
  res.json({ movies: results });
};

exports.getMovieForUpdate = async (req, res) => {
  const { movieId } = req.params;
  // console.log(movieId)
  if (!isValidObjectId(movieId)) return sendError(res, "Id is invalid ");
  const movie = await Movie.findById(movieId).populate(
    "director writers casts.actor"
  );
  console.log(movie);
  res.json({
    movie: {
      id: movie.id,
      title: movie.title,
      storyline: movie.storyline,
      poster: movie.poster?.url,
      releaseDate: movie.releaseDate,
      status: movie.status,
      type: movie.type,
      languages: movie.languages,
      genres: movie.genres,
      tags: movie.tags,
      director: formatActor(movie.director),
      writers: movie.writers.map((w) => formatActor(w)),
      casts: movie.casts.map((c) => {
        return {
          id: c.id,
          profile: formatActor(c.actor),
          rolAs: c.roleAs,
          leadActor: c.leadActor,
        };
      }),
    },
  });
};

exports.searchMovies = async (req, res) => {
  const { title } = req.query;
  if (!title.trim()) return sendError(res, "Invalid request!");
  const result = await Movie.find({
    title: { $regex: title, $options: "i" },
  });

  res.json({
    results: result.map((m) => {
      return {
        id: m.id,
        title: m.title,
        poster: m.poster,
        genres: m.genres,
        status: m.status,
      };
    }),
  });
};

exports.getLatestUploads = async (req, res) => {
  const { limit = 5 } = req.query;

  const results = await Movie.find({ status: "public" })
    .sort("-createdAt")
    .limit(parseInt(limit));

  const movies = results.map((m) => {
    return {
      id: m._id,
      title: m.title,
      storyLine: m.storyLine,
      poster: m.poster?.url,
      responsivePosters: m.poster.responsive,
      trailer: m.trailer?.url,
    };
  });
  res.json({ movies });
};

exports.getSingleMovie = async (req, res) => {
  const { movieId } = req.params;

  // mongoose.Types.ObjectId(movieId)

  // console.log(movieId)
  if (!isValidObjectId(movieId))
    return sendError(res, "Movie id is not valid!");

  const movie = await Movie.findById(movieId).populate(
    "director writers casts.actor"
  );
  // console.log(movie);
  const [aggregatedResponse] = await Review.aggregate(
    averageRatingPipeline(movie._id)
  );

  const reviews = {};

  if (aggregatedResponse) {
    const { ratingAvg, reviewCount } = aggregatedResponse;
    reviews.ratingAvg = parseFloat(ratingAvg).toFixed(1);
    reviews.reviewCount = reviewCount;
  }
  // console.log(reviews)

  const {
    _id: id,
    title,
    storyLine,
    casts,
    writers,
    director,
    releaseDate,
    genres,
    tags,
    languages,
    poster,
    trailer,
    type,
  } = movie;

  res.json({
    movie: {
      id,
      title,
      storyLine,
      releaseDate,
      genres,
      tags,
      languages,
      type,
      poster: poster?.url,
      trailer: trailer?.url,
      casts: casts.map((c) => ({
        id: c._id,
        profile: {
          id: c.actor._id,
          name: c.actor.name,
          avatar: c.actor?.avatar?.url,
        },
        leadActor: c.leadActor,
        roleAs: c.roleAs,
      })),
      writers: writers.map((w) => ({
        id: w._id,
        name: w.name,
      })),
      director: {
        id: director._id,
        name: director.name,
      },
      reviews: { ...reviews },
    },
  });
};

exports.getRelatedMovies = async (req, res) => {
  const { movieId } = req.params;
  if (!isValidObjectId(movieId)) return sendError(res, "Invalid movie id!");

  const movie = await Movie.findById(movieId);

  const movies = await Movie.aggregate(
    relatedMovieAggregation(movie.tags, movie._id)
  );

  const mapMovies = async (m) => {
    const reviews = await getAverageRatings(m._id);

    return {
      id: m._id,
      title: m.title,
      poster: m.poster,
      responsivePosters: m.responsivePosters,
      reviews: { ...reviews },
    };
  };
  const relatedMovies = await Promise.all(movies.map(mapMovies));

  res.json({ movies: relatedMovies });
};

exports.getTopRatedMovies = async (req, res) => {
  const { type = "Film" } = req.query;

  const movies = await Movie.aggregate(topRatedMoviesPipeline(type));

  const mapMovies = async (m) => {
    const reviews = await getAverageRatings(m._id);

    return {
      id: m._id,
      title: m.title,
      poster: m.poster,
      responsivePosters: m.responsivePosters,
      reviews: { ...reviews },
    };
  };

  const topRatedMovies = await Promise.all(movies.map(mapMovies));

  res.json({ movies: topRatedMovies });
};

exports.searchPublicMovies = async (req, res) => {
  const { title } = req.query;

  if (!title.trim()) return sendError(res, "Invalid request!");

  const movies = await Movie.find({
    title: { $regex: title, $options: "i" },
    status: "public",
  });

  const mapMovies = async (m) => {
    const reviews = await getAverageRatings(m._id);

    return {
      id: m._id,
      title: m.title,
      poster: m.poster?.url,
      responsivePosters: m.poster?.responsive,
      reviews: { ...reviews },
    };
  };

  const results = await Promise.all(movies.map(mapMovies));

  res.json({
    results,
  });
};
