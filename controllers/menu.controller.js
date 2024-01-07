const expressAsyncHandler = require("express-async-handler");
const { Category, Restaurant, Menu } = require("../models");
// const { updateCategoryInRestaurant } = require("../services/category.service");
const { menuService } = require("../services");
const httpStatus = require("http-status");

const createMenu = expressAsyncHandler(async (req, res) => {
  const { categoryId } = req.body;
  const menu = new Menu(req.body);
  const newMenu = await menu.save();
  if (categoryId && categoryId.length > 0) {
    categoryId.map(async (catId) => {
      const category = await Category.findById(catId);
      category.entities.menu.push(newMenu);
      await category.save();
      // await updateCategoryInRestaurant(restaurantId, catId);
    });
  }
  res.status(201).json(newMenu);
});

const addMenutoMenu = expressAsyncHandler(async (req, res) => {
  const { menu1Id, menu2Id } = req.body;
  const menu = await menuService.addMenutoMenu(menu1Id, menu2Id);
  if (!menu) {
    res.status(404).send({ message: "Menu Not Found" });
  }
  return res.status(httpStatus.OK).send(menu);
});

const getMenu = expressAsyncHandler(async (req, res) => {
  const { menuId } = req.params;
  const menu = await menuService.getMenu(menuId);
  if (!menu) {
    res.status(404).send({ message: "Menu Not Found" });
  }
  return res.status(httpStatus.OK).send(menu);
});

module.exports = {
  createMenu,
  addMenutoMenu,
  getMenu,
};
