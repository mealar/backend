const express = require("express");
const router = express.Router();
const { additionController } = require("../controllers");
const { additionValidation } = require("../validations");
const validate = require("../utils/validate");

router.post(
  "/dish",
  validate(additionValidation.createAdditionForDish),
  additionController.createAdditionForDish
);
router.post(
  "/menu",
  validate(additionValidation.createAdditionForMenu),
  additionController.createAdditionForMenu
);

module.exports = router;
