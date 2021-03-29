var createError = require("http-errors");
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var users = require('./routes/users');

var app = express();

//import database
var mongoose = require('mongoose');
var configDB=require('./database/mongodb.json');



app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser())

app.use('/api/v1/users', users);

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
  res.render("error");
});

//mongo config
const connect = mongoose.connect(
  configDB.mongo.uri ,
  {
  useNewUrlParser: true ,
  useUnifiedTopology: true
  },
  ()=> console.log("Connected to DB !!")
  );

module.exports = app;
