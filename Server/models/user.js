const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    trim: true, // use to Remove White Spaces
    require: true,
  },
  email: {
    type: String,
    trim: true, // use to Remove White Spaces
    require: true,
    unique: true,
  },
  password: {
    type: String,
    require: true,
  },
  isVerified: {
    type: Boolean,
    require: true,
    default: false,
  },
  role: {
    type: String,
    default: "user",
    enum: ["user", "admin"],
  },
});

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

userSchema.methods.comparePassword = async function (password) {
  const result = await bcrypt.compare(password, this.password);
  return result;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
