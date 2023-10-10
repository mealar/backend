const expressAsyncHandler = require("express-async-handler");
const { Order, Restaurant } = require("../models");

const createOrder = expressAsyncHandler(async (req, res) => {
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
  restaurant.orders.push(newOrder);
  await restaurant.save();
  res.status(201).json(newOrder);
});
const getOrders = expressAsyncHandler(async (req, res) => {
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
