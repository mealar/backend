const expressAsyncHandler = require("express-async-handler");
const { Order, Restaurant } = require("../models");
const { orderValidation } = require("../validations");

const createOrder = expressAsyncHandler(async (req, res) => {
  const { error } = orderValidation.createOrder(req.body);
  if (error) return res.status(400).send({ message: error.details[0].message });
  const { restaurantId } = req.body;
  const restaurant = await Restaurant.findOne({ _id: restaurantId });
  if (!restaurant) {
    res.status(404).send({ message: "Restaurant Not Found" });
  }
  const order = new Order({
    restaurantId: req.body.restaurantId,
    deliveryTable: req.body.deliveryTable,
    estimatedPreparationTime: req.body.estimatedPreparationTime,
    actualPreparationTime: req.body.actualPreparationTime,
    loyaltyPointsEarned: req.body.loyaltyPointsEarned,
    deliveryTime: new Date(
      new Date().getTime() + req.body.actualPreparationTime * 60 * 1000
    ),
    dishes: req.body.dishes,
  });
  try {
    const newOrder = await order.save();
    res.status(201).json(newOrder);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
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
