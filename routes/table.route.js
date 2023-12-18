const express = require("express");
const router = express.Router();
const { tableController } = require("../controllers");
const { tableValidation } = require("../validations");
const validate = require("../utils/validate");

router.post(
  "/",
  validate(tableValidation.createTable),
  tableController.createTable
);
router.get(
  "/:restaurantId",
  validate(tableValidation.getTables),
  tableController.getTables
);

module.exports = router;
