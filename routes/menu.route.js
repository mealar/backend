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
router.get("/", menuController.getMenus);
router.post(
  "/add-menu",
  validate(menuValidation.addMenutoMenu),
  menuController.addMenutoMenu
);

module.exports = router;
