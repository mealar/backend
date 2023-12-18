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
router.get("/:categoryId", categoryController.getCategory);
router.post("/cat-to-cat", categoryController.addCategorytoCategory);

module.exports = router;
