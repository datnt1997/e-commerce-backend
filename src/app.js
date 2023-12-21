require('dotenv').config()
const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const compression = require("compression");
const app = express();

// console.log('Process::', process.env)
// init middlewares
app.use(morgan("dev"));
app.use(helmet());
app.use(compression());

// int db
require("./dbs/init.mongodb");
const { checkOverload } = require("./helpers/check.connect");
checkOverload();
// init routes
app.get("/", (req, res, next) => {
  return res.status(200).json({ message: "Hello World" });
});
// handling error

module.exports = app;
