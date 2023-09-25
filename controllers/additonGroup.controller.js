const expressAsyncHandler = require("express-async-handler");
const { AdditionGroup, Dish, Menu, Restaurant } = require("../models");
const { additionGroupValidation } = require("../validations");

const createAdditionGroup = expressAsyncHandler(async (req, res) => {
  const { error } = additionGroupValidation.createAdditionGroup(req.body);
  if (error) return res.status(400).send({ message: error.details[0].message });
  const { menuId, dishId } = req.body;
  const group = new AdditionGroup(req.body);
  await group.save();
  if (dishId) {
    const dish = await Dish.findOne({ _id: dishId });
    dish.additions.push(group._id);
    dish.save();
    if (!dish) {
      res.status(404).send({ message: "Dish Not Found" });
    }
  }
  if (menuId) {
    const menu = await Menu.findOne({ _id: menuId });
    menu.additions.push(group._id);
    menu.save();
    if (!menu) {
      res.status(404).send({ message: "Menu Not Found" });
    }
  }
  res.status(201).json(group);
});
const getAdditionGroups = expressAsyncHandler(async (req, res) => {
  // const { error } = dishValidation.getDishes(req.body);
  // if (error) return res.status(400).send({ message: error.details[0].message });
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
