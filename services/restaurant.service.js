const httpStatus = require("http-status");
const { Restaurant, Menu, Category, Dish } = require("../models");
const ApiError = require("../utils/ApiError");

const getOwnerRestaurants = async (ownerId) => {
  const restaurants = await Restaurant.find({
    ownerId,
    status: "active",
  }).select("_id name logo images");

  if (!restaurants) {
    throw new ApiError(httpStatus.NOT_FOUND, "Restaurants not found");
  }
  return restaurants;
};
const getAllRestaurants = async () => {
  const restaurants = await Restaurant.find();
  if (!restaurants) {
    throw new ApiError(httpStatus.NOT_FOUND, "Restaurants not found");
  }
  return restaurants;
};

const createRestaurant = async (body) => {
  const restaurant = new Restaurant(body);
  const newRestaurant = await restaurant.save();
  return newRestaurant;
};

const getRestaurant = async (restaurantId) => {
  const restaurant = await Restaurant.findById(restaurantId)
    .populate({
      path: "categories",
      populate: {
        path: "entities.dish",
        model: "Dish",
      },
    })
    .select("-orders -tables");
  if (!restaurant) {
    throw new ApiError(httpStatus.NOT_FOUND, "Restaurant not found");
  }

  return restaurant;
};
const getRestaurantwithAllCategories = async (restaurantId) => {
  const restaurant = await Restaurant.findById(restaurantId);
  if (!restaurant) {
    throw new ApiError(httpStatus.NOT_FOUND, "Restaurant not found");
  }
  const all_categories = await Category.find({ restaurantId });
  const all_dishes = await Dish.find({ restaurantId });
  const all_menus = await Menu.find({ restaurantId });
  return { restaurant, all_categories, all_dishes, all_menus };
};

const updateRestaurant = async (updateBody, restaurantId) => {
  const restaurant = await Restaurant.findByIdAndUpdate({
    _id: restaurantId,
  });
  Object.assign(restaurant, updateBody);

  restaurant.save();

  if (!restaurant) {
    throw new ApiError(httpStatus.NOT_FOUND, "Restaurant not found");
  }
  return restaurant;
};

const deleteRestaurant = async (restaurantId) => {
  const restaurant = await Restaurant.findById(restaurantId);

  if (restaurant && restaurant.status !== "deleted") {
    restaurant.status = "deleted";
    restaurant.save();
    return { message: "Restaurant Deleted" };
  } else {
    throw new ApiError(httpStatus.NOT_FOUND, "Restaurant not found");
  }
};
const selectMenu = async (restaurantId, menuId) => {
  const restaurant = await Restaurant.findById(restaurantId);
  const menu = await Menu.findById(menuId);
  if (!menu) {
    throw new ApiError(httpStatus.NOT_FOUND, "Menu not found");
  }
  if (restaurant) {
    restaurant.selectedMenu = menu;
    restaurant.save();
    return menu;
  } else {
    throw new ApiError(httpStatus.NOT_FOUND, "Restaurant not found");
  }
};

module.exports = {
  createRestaurant,
  deleteRestaurant,
  getOwnerRestaurants,
  getAllRestaurants,
  getRestaurant,
  updateRestaurant,
  selectMenu,
  getRestaurantwithAllCategories,
};
