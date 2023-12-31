const express = require("express");
const router = express.Router();
const { restaurantController } = require("../controllers");
const { restaurantValidation } = require("../validations");
const validate = require("../utils/validate");

router.get(
  "/owner/:ownerId",
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
router.get(
  "/with-cat/:restaurantId",
  validate(restaurantValidation.getRestaurant),
  restaurantController.getRestaurantwithAllCategories
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
router.post(
  "/select-menu",
  validate(restaurantValidation.selectMenu),
  restaurantController.selectMenu
);

module.exports = router;
