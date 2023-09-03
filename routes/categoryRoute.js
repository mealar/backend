const express = require("express");
const router = express.Router();
const { categoryController } = require("../controllers");

router.post("/", categoryController.createCategory);

module.exports = router;
