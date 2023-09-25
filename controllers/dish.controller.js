const expressAsyncHandler = require("express-async-handler");
const { Dish, Restaurant, AdditionGroup } = require("../models");
const { dishValidation } = require("../validations");

const createDish = expressAsyncHandler(async (req, res) => {
  const { error } = dishValidation.createDish(req.body);
  if (error) return res.status(400).send({ message: error.details[0].message });
  const { restaurantId } = req.body;
  const restaurant = await Restaurant.findOne({ _id: restaurantId });
  if (!restaurant) {
    res.status(404).send({ message: "Restaurant Not Found" });
  }
  const dish = new Dish(req.body);
  try {
    await dish.save();
    res.status(201).json(dish);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

const getDishes = expressAsyncHandler(async (req, res) => {
  const { error } = dishValidation.getDishes(req.body);
  if (error) return res.status(400).send({ message: error.details[0].message });
  const { restaurantId } = req.body;
  const restaurant = await Restaurant.findOne({ _id: restaurantId });
  if (!restaurant) {
    res.status(404).send({ message: "Restaurant Not Found" });
  }
  const dishes = await Dish.find()
    .populate({
      path: "additions",
      select: "_id name additionObjects default isRequired",
      populate: {
        path: "additionObjects",
        select: "_id name price calories",
      },
    })
    .populate({
      path: "additions",
      select: "_id name additionObjects default",
      populate: {
        path: "default",
        select: "_id name price calories",
      },
    });
  if (!dishes) {
    res.status(404).send({ message: "Dishes Not Found" });
  }
  res.status(201).json(dishes);
});

module.exports = {
  createDish,
  getDishes,
};
