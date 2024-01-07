const express = require("express");
const router = express.Router();
const { menuController } = require("../controllers");
const { menuValidation } = require("../validations");
const validate = require("../utils/validate");

router.post(
  "/",
  validate(menuValidation.createMenu),
  menuController.createMenu
);
router.post(
  "/add-menu",
  validate(menuValidation.addMenutoMenu),
  menuController.addMenutoMenu
);
router.get(
  "/:menuId",
  validate(menuValidation.getMenu),
  menuController.getMenu
);

module.exports = router;
