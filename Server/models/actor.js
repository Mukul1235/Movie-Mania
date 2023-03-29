const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const actorSchema = mongoose.Schema(
  {
    name: {
      type: String,
      trim: true, // use to Remove White Spaces
      require: true,
    },
    email: {
      type: String,
      trim: true, // use to Remove White Spaces
      require: true,
    },
    gender: {
      type: String,
      trim: true, // use to Remove White Spaces
      require: true,
    },
    avtar: {
      type: Object,
      url: String,
      public_id: String,
    },
  },
  { timestamps: true }
);

const Actor = mongoose.model("Actor", actorSchema);

module.exports = Actor;
