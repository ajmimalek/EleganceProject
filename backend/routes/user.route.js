const express = require("express");
const router = express.Router();


// import controller
const { requireSignin } = require("../controllers/auth.controller");
const {
  readController,
  updateController,
  outfitController,
} = require("../controllers/user.controller");

router.get("/:id", requireSignin, readController);
router.put(
  "/update/:id",
  requireSignin,
  updateController
);
router.get("/outfit", requireSignin, outfitController);


module.exports = router;
