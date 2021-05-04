const express = require("express");
const router = express.Router();

const {
  tshirtController,
  } = require("../controllers/store.controller");

  const{
    accessoiresController,
  } = require("../controllers/accessoires.controller");

  router.get("/tshirt", tshirtController);
  router.get("/accessoires", accessoiresController);


  module.exports = router;