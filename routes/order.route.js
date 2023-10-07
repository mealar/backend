const express = require("express");
const router = express.Router();
const { orderController } = require("../controllers");
const { orderValidation } = require("../validations");
const validate = require("../utils/validate");

router.post(
  "/",
  validate(orderValidation.createOrder),
  orderController.createOrder
);
router.get("/", orderController.getOrders);

module.exports = router;
