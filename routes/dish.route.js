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

module.exports = router;
