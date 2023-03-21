const mongoose = require('mongoose');

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("Db is connected".blue.bold);
  })
  .catch((err) => {
    console.log("Db Connection Failed", err.red.bold);
  });