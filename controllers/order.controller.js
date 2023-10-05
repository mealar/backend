const expressAsyncHandler = require("express-async-handler");
const { Order, Restaurant, Dish } = require("../models");
const { orderValidation } = require("../validations");
const addition = require("../models/addition.model");

const createOrder = expressAsyncHandler(async (req, res) => {
  const { error } = orderValidation.createOrder(req.body);
  if (error) return res.status(400).send({ message: error.details[0].message });
  const { restaurantId, deliveryTable, dishes, menus, totalPrice } = req.body;
  const restaurant = await Restaurant.findOne({ _id: restaurantId });
  if (!restaurant) {
    res.status(404).send({ message: "Restaurant Not Found" });
  }

  const order = new Order({
    restaurantId,
    deliveryTable,
    dishes,
    menus,
    totalPrice,
  });

  const newOrder = await order.save();
  restaurant.orders.push(newOrder._id);
  restaurant.save();
  res.status(201).json(newOrder);
});
const getOrders = expressAsyncHandler(async (req, res) => {
  const { error } = orderValidation.getOrders(req.body);
  if (error) return res.status(400).send({ message: error.details[0].message });
  const { restaurantId } = req.body;
  const restaurant = await Restaurant.findOne({ _id: restaurantId });
  if (!restaurant) {
    res.status(404).send({ message: "Restaurant Not Found" });
  }
  const orders = await Order.find({ restaurantId });
  if (!orders) {
    res.status(404).send({ message: "Orders Not Found" });
  }
  res.status(201).json(orders);
});

module.exports = {
  createOrder,
  getOrders,
};
