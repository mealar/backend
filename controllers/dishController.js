const expressAsyncHandler = require("express-async-handler");
const { Dish, Restaurant } = require("../models");
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

const additionToDish = expressAsyncHandler(async (req, res) => {
  const { error } = dishValidation.additionToDish(req.body);
  if (error) return res.status(400).send({ message: error.details[0].message });
  const { dishId, addition } = req.body;
  const dish = await Dish.findOne({ _id: dishId });
  if (!dish) {
    res.status(404).send({ message: "Dish Not Found" });
  }
  dish.additions.push(addition);
  console.log(addition);
  await dish.save();
  res.status(201).json(dish);
});

module.exports = {
  createDish,
  additionToDish,
};