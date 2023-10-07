const express = require("express");
const router = express.Router();
const { categoryController } = require("../controllers");
const { categoryValidation } = require("../validations");
const validate = require("../utils/validate");

router.post(
  "/",
  validate(categoryValidation.createCategory),
  categoryController.createCategory
);

module.exports = router;
