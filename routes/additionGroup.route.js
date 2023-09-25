const express = require("express");
const router = express.Router();
const { additonGroupController } = require("../controllers");

router.post("/", additonGroupController.createAdditionGroup);
router.get("/", additonGroupController.getAdditionGroups);

module.exports = router;
