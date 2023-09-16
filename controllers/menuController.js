const expressAsyncHandler = require("express-async-handler");
const { Restaurant, Menu, AdditionGroup } = require("../models");
const { menuValidation } = require("../validations");

const createMenu = expressAsyncHandler(async (req, res) => {
  const { error } = menuValidation.createMenuValidate(req.body);
  if (error) return res.status(400).send({ message: error.details[0].message });
  const { restaurantId } = req.body;
  const restaurant = await Restaurant.findOne({ _id: restaurantId });
  if (!restaurant) {
    res.status(404).send({ message: "Restaurant Not Found" });
  }
  const menu = new Menu(req.body);
  try {
    const newMenu = await menu.save();
    res.status(201).json(newMenu);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

const additionToMenu = expressAsyncHandler(async (req, res) => {
  const { error } = menuValidation.additionToMenu(req.body);
  if (error) return res.status(400).send({ message: error.details[0].message });
  const { menuId, groupId } = req.body;
  const menu = await Menu.findOne({ _id: menuId });
  if (!menu) {
    res.status(404).send({ message: "Menu Not Found" });
  }
  const group = await AdditionGroup.findOne({ _id: groupId });
  if (!group) {
    res.status(404).send({ message: "Group Not Found" });
  }
  menu.additions.push(group._id);
  await menu.save();
  res.status(201).json(menu);
});
const getMenus = expressAsyncHandler(async (req, res) => {
  const { error } = menuValidation.getMenus(req.body);
  if (error) return res.status(400).send({ message: error.details[0].message });
  const { restaurantId } = req.body;
  const restaurant = await Restaurant.findOne({ _id: restaurantId });
  if (!restaurant) {
    res.status(404).send({ message: "Restaurant Not Found" });
  }
  const menus = await Menu.find().populate({
    path: "additions",
    select: "_id name additionObjects",
    populate: {
      path: "additionObjects",
      select: "_id name price calories",
    },
  });
  if (!menus) {
    res.status(404).send({ message: "Menus Not Found" });
  }
  res.status(201).json(menus);
});

module.exports = {
  createMenu,
  additionToMenu,
  getMenus,
};
