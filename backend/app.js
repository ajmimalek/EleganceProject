var createError = require("http-errors");
<<<<<<< HEAD
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
const fileuploder =require("express-fileupload");
const cors = require("cors");
var users = require('./routes/users');
//var clothes = require('./routes/Clothes');
=======
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
>>>>>>> 758b404b3e9886943a289689575c41ddb1d2b61b

var app = express();

//import database
var mongoose = require("mongoose");
var configDB = require("./database/mongodb.json");

// Config dotev
require("dotenv").config({
  path: "./config/config.env",
});

<<<<<<< HEAD
app.use(cors({exposedHeader:"id"}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(fileuploder());
app.use('/api/v1/users', users);
//app.use('/clothes',clothes)
=======
// Dev Logginf Middleware
if (process.env.NODE_ENV === "development") {
  app.use(cors());
  app.use(morgan("dev"));
  //Morgan give information about each request.
  //Cors it's allow to deal with react for localhost at port 3000 without any problem
}

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Load routes
const authRouter = require("./routes/auth.route");

// Use Routes
app.use("/api", authRouter);

>>>>>>> 758b404b3e9886943a289689575c41ddb1d2b61b
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({ message: err.message });
});

//mongo config
const connect = mongoose.connect(
  configDB.mongo.uri,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => console.log("Connected to DB !!")
);

module.exports = app;
