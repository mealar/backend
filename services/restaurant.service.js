const httpStatus = require("http-status");
const { Restaurant } = require("../models");
const ApiError = require("../utils/ApiError");

const getOwnerRestaurants = async (ownerId) => {
  const restaurants = await Restaurant.find({ ownerId, status: "active" });
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
  const restaurant = await Restaurant.findById(restaurantId);
  if (!restaurant) {
    throw new ApiError(httpStatus.NOT_FOUND, "Restaurant not found");
  }
  return restaurant;
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

module.exports = {
  createRestaurant,
  deleteRestaurant,
  getOwnerRestaurants,
  getAllRestaurants,
  getRestaurant,
  updateRestaurant,
};
