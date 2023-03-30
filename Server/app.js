const express = require("express");
const colors = require("colors");
const morgan = require("morgan");
const dotenv = require("dotenv");
const cors=require("cors");
require('express-async-errors');
dotenv.config();
const UserRouter = require("./routers/user");
const ActorRouter = require("./routers/actor");
const { errorHandler } = require("./middleware/errorHandler");
const { handleNotfound } = require("./utils/helper");
require("./db/index");
const app = express();

app.use(cors())
app.use(express.json());

app.use(morgan("dev")); // this will tell where is the problem in code and it will return like POST /asd/asd/as statusCode:401
app.use("/api/user", UserRouter);
app.use("/api/actor", ActorRouter);
app.use("/*",handleNotfound)

app.use(errorHandler);

const PORT = 6003;
app.listen(PORT, () => {
  console.log(`PORT IS RUNNING ON ${PORT}`.bold.green);
});
