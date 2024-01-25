const expressAsyncHandler = require("express-async-handler");
const { Dish, Restaurant, Category } = require("../models");
// const { updateCategoryInRestaurant } = require("../services/category.service");
const { dishService } = require("../services");
const httpStatus = require("http-status");

const createDish = expressAsyncHandler(async (req, res) => {
  const { categoryId, restaurantId } = req.body;
  const dish = new Dish(req.body);
  const newDish = await dish.save();
  if (categoryId && categoryId.length > 0) {
    categoryId.map(async (catId) => {
      const category = await Category.findById(catId);
      category.entities.dish.push(newDish);
      await category.save();
      // await updateCategoryInRestaurant(restaurantId, catId);
    });
  }
  res.status(201).json(newDish);
});

const getDishes = expressAsyncHandler(async (req, res) => {
  const { restaurantId } = req.params;
  const restaurant = await Restaurant.findOne({ _id: restaurantId });
  if (!restaurant) {
    res.status(404).send({ message: "Restaurant Not Found" });
  }
  const dishes = await Dish.find();
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

const addImageDish = expressAsyncHandler(async (req, res) => {
  const { dishId } = req.params;
  const dish = await Dish.findById(dishId);
  if (!dish) {
    res.status(404).send({ message: "Dish Not Found" });
  }
  dish.images = req.body.images;
  await dish.save();
  return res.status(httpStatus.OK).send(dish);
});
module.exports = {
  createDish,
  getDishes,
  addDishtoDish,
  addDishtoMenu,
  addImageDish,
};
