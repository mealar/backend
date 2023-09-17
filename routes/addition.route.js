const express = require("express");
const router = express.Router();
const { additionController } = require("../controllers");

router.post("/", additionController.createAddition);

module.exports = router;
