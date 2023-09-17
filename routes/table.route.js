const express = require("express");
const router = express.Router();
const { tableController } = require("../controllers");

router.post("/", tableController.createTable);
router.get("/", tableController.getTables);

module.exports = router;
