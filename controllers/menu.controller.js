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

module.exports = {
  createMenu,
  getMenus,
};
