const express = require("express");
const router = express.Router();
const { dishController } = require("../controllers");

router.post("/", dishController.createDish);
router.post("/addition", dishController.additionToDish);

module.exports = router;
