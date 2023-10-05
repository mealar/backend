const express = require("express");
const router = express.Router();
const { additionController } = require("../controllers");
const { additionValidation } = require("../validations");
const validate = require("../utils/validate");

router.post(
  "/",
  validate(additionValidation.createAddition),
  additionController.createAddition
);

module.exports = router;
