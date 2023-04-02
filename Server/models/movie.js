const mongoose = require("mongoose");
const genres = require("../genres");

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
    enum: genres,
  },
  tags: {
    type: [String],
    required: true,
  },
  casts: [
    {
      actor: { type: mongoose.Schema.Types.ObjectId, ref: "Actor" },
      roleAs: String,
      leadActor: Boolean,
    },
  ],
  writers: [
    {
      type: mongoose.Schema.Types.ObjectId,
    },
  ],
});
