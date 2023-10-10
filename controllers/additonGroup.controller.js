const expressAsyncHandler = require("express-async-handler");
const { AdditionGroup, Dish, Menu, Restaurant } = require("../models");
const { updateCategoryInRestaurant } = require("../services/category.service");

const createAdditionGroup = expressAsyncHandler(async (req, res) => {
  const { menuId, dishId, restaurantId, categoryId } = req.body;
  const group = new AdditionGroup(req.body);
  await group.save();
  if (dishId) {
    const dish = await Dish.findOne({ _id: dishId });
    dish.additions.push(group._id);
    await dish.save();
    await updateCategoryInRestaurant(restaurantId, categoryId);
    if (!dish) {
      res.status(404).send({ message: "Dish Not Found" });
    }
  }
  if (menuId) {
    const menu = await Menu.findOne({ _id: menuId });
    menu.additions.push(group._id);
    await menu.save();
    await updateCategoryInRestaurant(restaurantId, categoryId);
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
