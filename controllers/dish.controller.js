const expressAsyncHandler = require("express-async-handler");
const { Dish, Restaurant, Category } = require("../models");
const { updateCategoryInRestaurant } = require("../services/category.service");
const { dishService } = require("../services");
const httpStatus = require("http-status");

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
const addDishtoDish = expressAsyncHandler(async (req, res) => {
  const { dish1Id, dish2Id } = req.body;
  const dish = await dishService.addDishtoDish(dish1Id, dish2Id);
  if (!dish) {
    res.status(404).send({ message: "Dish Not Found" });
  }
  return res.status(httpStatus.OK).send(dish);
});
const addDishtoMenu = expressAsyncHandler(async (req, res) => {
  const { dishId, menuId } = req.body;
  const dish = await dishService.addDishtoMenu(dishId, menuId);
  if (!dish) {
    res.status(404).send({ message: "Dish Not Found" });
  }
  return res.status(httpStatus.OK).send(dish);
});
module.exports = {
  createDish,
  getDishes,
  addDishtoDish,
  addDishtoMenu,
};
