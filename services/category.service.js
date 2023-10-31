const httpStatus = require("http-status");
const mongoose = require("mongoose");
const { Category, Restaurant } = require("../models");
const ApiError = require("../utils/ApiError");

const getCategory = async (categoryId) => {
  const category = await Category.findById(categoryId)
    .populate({
      path: "entities.dish",
      model: "Dish",
      populate: {
        path: "additions",
        model: "additionGroup",
        populate: {
          path: "additionObjects",
          model: "addition",
        },
      },
    })
    .populate({
      path: "entities.menu",
      model: "Menu",
      populate: {
        path: "additions",
        model: "additionGroup",
        populate: {
          path: "additionObjects",
          model: "addition",
        },
      },
    })
    .populate({
      path: "entities.category",
      model: "Category",
    });
  return category;
};

const createCategory = async (body) => {
  const restaurant = await Restaurant.findById(body.restaurantId);
  if (!restaurant) {
    throw new ApiError(httpStatus.NOT_FOUND, "Restaurant not found");
  }
  const category = new Category(body);
  const newCategory = await category.save();
  restaurant.categories.push(newCategory);
  await restaurant.save();
  return newCategory;
};

const updateCategoryInRestaurant = async (restaurantId, categoryId) => {
  const restaurant = await Restaurant.findById(restaurantId);
  if (!restaurant) {
    throw new ApiError(httpStatus.NOT_FOUND, "Restaurant not found");
  }
  const catId = new mongoose.Types.ObjectId(categoryId);
  const categoryIndex = restaurant.categories.findIndex(
    (category) => category._id.toString() === catId.toString()
  );
  if (categoryIndex !== -1) {
    const updatedCategory = await getCategory(categoryId);
    restaurant.categories[categoryIndex] = updatedCategory;
    await restaurant.save();
    return "Category Updated in restaurant Successfully .";
  } else {
    return "Category Not Updated in restaurant.";
  }
};
const addCategorytoCategory = async (cat1Id, cat2Id) => {
  const category1 = await Category.findById(cat1Id);
  if (!category1) {
    throw new ApiError(httpStatus.NOT_FOUND, "Category not found");
  }
  category1.entities.category.push(cat2Id);
  category1.save();
  updateCategoryInRestaurant(category1.restaurantId, cat1Id);
  return category1;
};

module.exports = {
  getCategory,
  createCategory,
  updateCategoryInRestaurant,
  addCategorytoCategory,
};
