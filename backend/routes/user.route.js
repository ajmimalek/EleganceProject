const express = require("express");
const router = express.Router();
const multer = require("multer");
const { v4: uuidv4 } = require("uuid");
let path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "images");
  },
  filename: function (req, file, cb) {
    cb(null, uuidv4() + "-" + Date.now() + path.extname(file.originalname));
  },
});

const fileFilter = (req, file, cb) => {
  const allowedFileTypes = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/jfif",
  ];
  if (allowedFileTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

let upload = multer({ storage, fileFilter });


// import controller
const { requireSignin } = require("../controllers/auth.controller");
const {
  readController,
  updateController,
} = require("../controllers/user.controller");

router.get("/user/:id", requireSignin, readController);
router.put(
  "/user/update/:id",
  upload.single("photo"),
  requireSignin,
  updateController
);

module.exports = router;
