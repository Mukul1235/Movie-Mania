const mongoose = require('mongoose');
const colors = require("colors");

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("Db is connected".blue.bold);
  })
  .catch((err) => {
    console.log("Db Connection Failed".red.bold);
  });