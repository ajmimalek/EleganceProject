const express = require("express");
const router = express.Router();

const {
  tshirtController,
  } = require("../controllers/store.controller");
  const {
    trousersController,
    } = require("../controllers/trousers.controller");
    const {
      shoesController,
      } = require("../controllers/shoes.controller");

  const{
    accessoiresController,
  } = require("../controllers/accessoires.controller");

  router.get("/tshirt", tshirtController);
  router.get("/accessoires", accessoiresController);
  router.get("/trousers", trousersController);
  router.get("/shoes", shoesController);



  module.exports = router;