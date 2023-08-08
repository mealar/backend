const express = require("express");
const router = express.Router();
const restaurantController = require("../controllers/restaurantController");

// Tüm restoranları listeleme
router.get("/", restaurantController.getAllRestaurants);

// Yeni bir restoran oluşturma
router.post("/", restaurantController.createRestaurant);

// Belirli bir restoranı görüntüleme
router.get("/:id", restaurantController.getRestaurant);

// Belirli bir restoranı güncelleme
router.put("/:id", restaurantController.updateRestaurant);

// Belirli bir restoranı silme
router.delete("/:id", restaurantController.deleteRestaurant);

module.exports = router;
