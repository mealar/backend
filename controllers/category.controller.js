const expressAsyncHandler = require("express-async-handler");
const { Category, Restaurant } = require("../models");

const createCategory = expressAsyncHandler(async (req, res) => {
  const { restaurantId } = req.body;
  const restaurant = await Restaurant.findById(restaurantId);
  if (!restaurant) {
    res.status(404).send({ message: "Restaurant Not Found" });
  }
  const category = new Category(req.body);
  try {
    const newCategory = await category.save();
    restaurant.categories.push(newCategory._id);
    await restaurant.save();
    res.status(201).json(newCategory);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = {
  createCategory,
};
