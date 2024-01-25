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
router.get("/:restaurantId", dishController.getDishes);
router.post(
  "/add-dish",
  validate(dishValidation.addDishtoDish),
  dishController.addDishtoDish
);
router.post(
  "/add-menu",
  validate(dishValidation.addDishtoMenu),
  dishController.addDishtoMenu
);
router.post("/add-image/:dishId", dishController.addImageDish);

module.exports = router;
