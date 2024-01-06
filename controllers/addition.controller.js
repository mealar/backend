const expressAsyncHandler = require("express-async-handler");
const { Dish, Menu } = require("../models");
// const { updateCategoryInRestaurant } = require("../services/category.service");

const createAdditionForDish = expressAsyncHandler(async (req, res) => {
  const { dishId, groupName } = req.body;
  const dish = await Dish.findOne({ _id: dishId });
  const addition = {
    name: req.body.name,
    price: req.body.price,
    calories: req.body.calories,
    default: req.body.default,
  };
  try {
    const group = dish.additions.find((item) => item.name === groupName);
    group.additionObjects.push(addition);
    if (req.body.default) group.default = addition;
    await dish.save();
    // if (dish.categoryId && dish.categoryId.length > 0) {
    //   dish.categoryId.map(async (catId) => {
    //     await updateCategoryInRestaurant(restaurantId, catId);
    //   });
    // }

    res.status(201).json(dish);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
const createAdditionForMenu = expressAsyncHandler(async (req, res) => {
  const { menuId, groupName } = req.body;
  const menu = await Menu.findOne({ _id: menuId });
  const addition = {
    name: req.body.name,
    price: req.body.price,
    calories: req.body.calories,
    default: req.body.default,
  };
  try {
    const group = menu.additions.find((item) => item.name === groupName);
    group.additionObjects.push(addition);
    if (req.body.default) group.default = addition;
    await menu.save();
    // if (menu.categoryId && menu.categoryId.length > 0) {
    //   menu.categoryId.map(async (catId) => {
    //     await updateCategoryInRestaurant(restaurantId, catId);
    //   });
    // }

    res.status(201).json(menu);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = {
  createAdditionForDish,
  createAdditionForMenu,
};
