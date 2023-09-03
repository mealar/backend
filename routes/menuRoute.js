const express = require("express");
const router = express.Router();
const { menuController } = require("../controllers");

router.post("/", menuController.createMenu);

module.exports = router;
