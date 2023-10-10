const expressAsyncHandler = require("express-async-handler");
const { Dish, Restaurant, Category } = require("../models");
const { updateCategoryInRestaurant } = require("../services/category.service");

const createDish = expressAsyncHandler(async (req, res) => {
  const { categoryId, restaurantId } = req.body;
  const category = await Category.findById(categoryId);
  if (!category) {
    res.status(404).send({ message: "Category Not Found" });
  }
  const dish = new Dish(req.body);
  const newDish = await dish.save();
  category.entities.dish.push(newDish._id);
  await category.save();
  await updateCategoryInRestaurant(restaurantId, categoryId);
  res.status(201).json(newDish);
});

const getDishes = expressAsyncHandler(async (req, res) => {
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
