var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");

require("./models/clothes");
const clothesRoutes = require("./routes/clothes");
var app = express();

//import database
var mongoose = require("mongoose");

// Config dotev
require("dotenv").config();

// Dev Logginf Middleware
if (process.env.NODE_ENV === "development") {
  app.use(cors());
  app.use(morgan("dev"));
  //Morgan give information about each request.
  //Cors it's allow to deal with react for localhost at port 3000 without any problem
}
app.use(express.json({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Load routes
const authRouter = require("./routes/auth.route");
const userRouter = require("./routes/user.route");
//clothes Routes
app.use("/clothes", clothesRoutes);
// Use Routes
app.use("/api", authRouter);
app.use("/api", userRouter);


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
  
//connection mongoose
const connect = mongoose
  .connect(`${process.env.MONGO_URI}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to db "))
  .catch((err) => console.log("catched error " + err));

mongoose.set("useCreateIndex", true);
//Serving React Files
if (process.env.NODE_ENV === "production") {
  //we give server access to react application (the production mode 'build')
  app.use(express.static(path.join(__dirname, "../frontend/build")));
  //whenever we reach a get route in url, we send data into index.html
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "build", "index.html"));
  });
}

module.exports = app;
