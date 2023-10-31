const httpStatus = require("http-status");
const { Dish, Menu } = require("../models");
const ApiError = require("../utils/ApiError");
const { updateCategoryInRestaurant } = require("./category.service");

const addDishtoDish = async (dish1Id, dish2Id) => {
  const dish1 = await Dish.findById(dish1Id);
  if (!dish1) {
    throw new ApiError(httpStatus.NOT_FOUND, "Dish not found");
  }
  dish1.entities.dish.push(dish2Id);
  dish1.save();
  updateCategoryInRestaurant(dish1.restaurantId, dish1.categoryId);
  return dish1;
};
const addDishtoMenu = async (dishId, menuId) => {
  const menu = await Menu.findById(menuId);
  if (!menu) {
    throw new ApiError(httpStatus.NOT_FOUND, "Dish not found");
  }
  menu.entities.dish.push(dishId);
  menu.save();
  updateCategoryInRestaurant(menu.restaurantId, menu.categoryId);
  return menu;
};

module.exports = {
  addDishtoDish,
  addDishtoMenu,
};
