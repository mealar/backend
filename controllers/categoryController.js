const expressAsyncHandler = require("express-async-handler");
const { Category, Restaurant } = require("../models");
const { categoryValidation } = require("../validations");

const createCategory = expressAsyncHandler(async (req, res) => {
  const { error } = categoryValidation.createCategoryValidate(req.body);
  if (error) return res.status(400).send({ message: error.details[0].message });
  const { restaurantId } = req.body;
  const restaurant = await Restaurant.findOne({ _id: restaurantId });
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
