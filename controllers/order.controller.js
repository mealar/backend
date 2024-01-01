const expressAsyncHandler = require("express-async-handler");
const { Order, Restaurant } = require("../models");

const createOrder = expressAsyncHandler(async (req, res) => {
  const { restaurantId, deliveryTable, dishes, menus, totalPrice, user } =
    req.body;
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
    user,
  });
  const newOrder = await order.save();
  res.status(201).json(newOrder);
});
const getOrders = expressAsyncHandler(async (req, res) => {
  const { restaurantId } = req.params;
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
const getUserOrders = expressAsyncHandler(async (req, res) => {
  const { userId } = req.params;
  const orders = await Order.find({ user: userId });
  if (!orders) {
    res.status(404).send({ message: "Orders Not Found" });
  }
  res.status(201).json(orders);
});

module.exports = {
  createOrder,
  getOrders,
  getUserOrders,
};
