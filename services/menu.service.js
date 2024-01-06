const httpStatus = require("http-status");
const { Menu } = require("../models");
const ApiError = require("../utils/ApiError");
// const { updateCategoryInRestaurant } = require("./category.service");

const addMenutoMenu = async (menu1Id, menu2Id) => {
  const menu1 = await Menu.findById(menu1Id);
  if (!menu1) {
    throw new ApiError(httpStatus.NOT_FOUND, "Menu not found");
  }
  menu1.entities.menu.push(menu2Id);
  menu1.save();
  // updateCategoryInRestaurant(menu1.restaurantId, menu1.categoryId);
  return menu1;
};

module.exports = {
  addMenutoMenu,
};
