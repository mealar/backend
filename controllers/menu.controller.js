const expressAsyncHandler = require("express-async-handler");
const { Category, Restaurant, Menu } = require("../models");
const { updateCategoryInRestaurant } = require("../services/category.service");
const { menuService } = require("../services");
const httpStatus = require("http-status");

const createMenu = expressAsyncHandler(async (req, res) => {
  const { categoryId, restaurantId } = req.body;
  const category = await Category.findById(categoryId);
  if (!category) {
    res.status(404).send({ message: "Category Not Found" });
  }
  const menu = new Menu(req.body);
  const newMenu = await menu.save();
  category.entities.menu.push(newMenu._id);
  await category.save();
  await updateCategoryInRestaurant(restaurantId, categoryId);
  res.status(201).json(newMenu);
});

const getMenus = expressAsyncHandler(async (req, res) => {
  const { error } = menuValidation.getMenus(req.body);
  if (error) return res.status(400).send({ message: error.details[0].message });
  const { restaurantId } = req.body;
  const restaurant = await Restaurant.findOne({ _id: restaurantId });
  if (!restaurant) {
    res.status(404).send({ message: "Restaurant Not Found" });
  }
  const menus = await Menu.find()
    .populate({
      path: "additions",
      select: "_id name additionObjects default",
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
  if (!menus) {
    res.status(404).send({ message: "Menus Not Found" });
  }
  res.status(201).json(menus);
});

const addMenutoMenu = expressAsyncHandler(async (req, res) => {
  const { menu1Id, menu2Id } = req.body;
  const menu = await menuService.addMenutoMenu(menu1Id, menu2Id);
  if (!menu) {
    res.status(404).send({ message: "Menu Not Found" });
  }
  return res.status(httpStatus.OK).send(menu);
});

module.exports = {
  createMenu,
  getMenus,
  addMenutoMenu,
};
