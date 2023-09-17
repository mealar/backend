const express = require("express");
const router = express.Router();
const { restaurantController } = require("../controllers");

router.get("/", restaurantController.getAllRestaurants);
router.post("/", restaurantController.createRestaurant);
router.get("/:id", restaurantController.getRestaurant);
router.put("/:id", restaurantController.updateRestaurant);
router.delete("/:id", restaurantController.deleteRestaurant);

module.exports = router;
