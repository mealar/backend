const expressAsyncHandler = require("express-async-handler");
const { AdditionGroup, Dish, Menu, Restaurant } = require("../models");
const { updateCategoryInRestaurant } = require("../services/category.service");

const createAdditionGroup = expressAsyncHandler(async (req, res) => {
  const { menuId, dishId, restaurantId } = req.body;
  const group = {
    name: req.body.name,
    isRequired: req.body.isRequired,
    createdBy: req.body.createdBy,
  };
  if (dishId) {
    const dish = await Dish.findOne({ _id: dishId });
    dish.additions.push(group);
    await dish.save();
    if (dish.categoryId && dish.categoryId.length > 0) {
      dish.categoryId.map(async (catId) => {
        await updateCategoryInRestaurant(restaurantId, catId);
      });
    }
    if (!dish) {
      res.status(404).send({ message: "Dish Not Found" });
    }
  }
  if (menuId) {
    const menu = await Menu.findOne({ _id: menuId });
    menu.additions.push(group);
    await menu.save();
    if (menu.categoryId && menu.categoryId.length > 0) {
      menu.categoryId.map(async (catId) => {
        await updateCategoryInRestaurant(restaurantId, catId);
      });
    }
    if (!menu) {
      res.status(404).send({ message: "Menu Not Found" });
    }
  }
  res.status(201).json(group);
});
const getAdditionGroups = expressAsyncHandler(async (req, res) => {
  const { restaurantId } = req.body;
  const restaurant = await Restaurant.findOne({ _id: restaurantId });
  if (!restaurant) {
    res.status(404).send({ message: "Restaurant Not Found" });
  }
  const additionGroup = await AdditionGroup.find();

  if (!additionGroup) {
    res.status(404).send({ message: "additionGroup Not Found" });
  }
  res.status(201).json(additionGroup);
});
module.exports = {
  createAdditionGroup,
  getAdditionGroups,
};
