const express = require("express");
const router = express.Router();
const { restaurantController } = require("../controllers");
const { restaurantValidation } = require("../validations");
const validate = require("../utils/validate");

router.get(
  "/owner",
  validate(restaurantValidation.getOwnerRestaurants),
  restaurantController.getOwnerRestaurants
);
router.post(
  "/",
  validate(restaurantValidation.createRestaurant),
  restaurantController.createRestaurant
);
router.get(
  "/:restaurantId",
  validate(restaurantValidation.getRestaurant),
  restaurantController.getRestaurant
);
router.put(
  "/:restaurantId",
  validate(restaurantValidation.updateRestaurant),
  restaurantController.updateRestaurant
);
router.delete(
  "/:restaurantId",
  validate(restaurantValidation.deleteRestaurant),
  restaurantController.deleteRestaurant
);

module.exports = router;
