const expressAsyncHandler = require("express-async-handler");
const { Restaurant } = require("../models");

const getOwnerRestaurants = expressAsyncHandler(async (req, res) => {
  const { ownerId } = req.body;
  try {
    const restaurants = await Restaurant.find({ ownerId });
    res.json(restaurants);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

const createRestaurant = expressAsyncHandler(async (req, res) => {
  const restaurant = new Restaurant(req.body);
  try {
    const newRestaurant = await restaurant.save();
    res.status(201).json(newRestaurant);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

const getRestaurant = expressAsyncHandler(async (req, res) => {
  const { restaurantId } = req.params;
  const restaurant = await Restaurant.findById(restaurantId);
  if (restaurant) {
    res.send(restaurant);
  } else {
    res.status(404).send({ message: "Restaurant Not Found" });
  }
});

const updateRestaurant = expressAsyncHandler(async (req, res) => {
  const updateBody = { ...req.body };
  const { restaurantId } = req.params;
  const restaurant = await Restaurant.findByIdAndUpdate({
    _id: restaurantId,
  });
  Object.assign(restaurant, updateBody);

  restaurant.save();

  if (restaurant) {
    res.send({ message: "Restaurant Updated", restaurant });
  } else {
    res.status(404).send({ message: "Restaurant Not Found" });
  }
});

const deleteRestaurant = expressAsyncHandler(async (req, res) => {
  const restaurant = await Restaurant.findById(req.params.id);

  if (restaurant) {
    await Restaurant.findByIdAndDelete(req.params.id);
    res.send({ message: "Restaurant Deleted" });
  } else {
    res.status(404).send({ message: "Restaurant Not Found" });
  }
});

module.exports = {
  createRestaurant,
  deleteRestaurant,
  getOwnerRestaurants,
  getRestaurant,
  updateRestaurant,
};
