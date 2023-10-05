const express = require("express");
const router = express.Router();
const { additonGroupController } = require("../controllers");
const { additionGroupValidation } = require("../validations");
const validate = require("../utils/validate");

router.post(
  "/",
  validate(additionGroupValidation.createAdditionGroup),
  additonGroupController.createAdditionGroup
);
router.get("/", additonGroupController.getAdditionGroups);

module.exports = router;
