const express = require("express");
const router = express.Router();
const { dishController } = require("../controllers");
const { dishValidation } = require("../validations");
const validate = require("../utils/validate");

router.post(
  "/",
  validate(dishValidation.createDish),
  dishController.createDish
);
router.get("/", dishController.getDishes);
router.post(
  "/to-dish",
  validate(dishValidation.addDishtoDish),
  dishController.addDishtoDish
);
router.post(
  "/to-menu",
  validate(dishValidation.addDishtoMenu),
  dishController.addDishtoMenu
);

module.exports = router;
