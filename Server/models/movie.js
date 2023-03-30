const mongoose = require('mongoose');

const MovieSchema = mongoose.Schema({
  title: {
    type: String,
    trim: true,
    required: true,
  },
  storyline: {
    type: String,
    trim: true,
    required: true,
  },
  director: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Actor",
  },
  releaseDate: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    required: true,
    enum: ["public", "private"],
  },
  type: {
    type: String,
    required: true,
  },
  genres: {
    type: [String],
    required: true,
    enum: [],
  },
});