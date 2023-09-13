const express = require("express");
const router = express.Router();
const { menuController } = require("../controllers");

router.post("/", menuController.createMenu);
router.post("/addition", menuController.additionToMenu);

module.exports = router;
