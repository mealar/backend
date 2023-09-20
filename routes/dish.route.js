const express = require("express");
const router = express.Router();
const { dishController } = require("../controllers");

router.post("/", dishController.createDish);
router.get("/", dishController.getDishes);

module.exports = router;
