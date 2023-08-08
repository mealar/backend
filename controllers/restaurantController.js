const Restaurant = require("../models/restaurantModel");
const expressAsyncHandler = require("express-async-handler");

exports.getAllRestaurants = expressAsyncHandler(async (req, res) => {
  try {
    const restaurants = await Restaurant.find();
    res.json(restaurants);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Yeni bir restoran oluşturma
exports.createRestaurant = expressAsyncHandler(async (req, res) => {
  const restaurant = new Restaurant(req.body);
  try {
    const newRestaurant = await restaurant.save();
    res.status(201).json(newRestaurant);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Belirli bir restoranı görüntüleme
exports.getRestaurant = expressAsyncHandler(async (req, res) => {
  const restaurant = await Restaurant.findById(req.params.id);
  if (restaurant) {
    res.send(restaurant);
  } else {
    res.status(404).send({ message: "Restaurant Not Found" });
  }
});

exports.updateRestaurant = expressAsyncHandler(async (req, res) => {
  try {
    const {
      name,
      currency,
      address,
      isActive,
      selectedMenuIds,
      workingHours,
      cuisineType,
      paymentMethods,
      socialMediaLinks,
      ownerId,
      createdBy,
      lastModifiedBy,
      tags,
      images,
      logo,
    } = req.body;

    const updatedData = {
      name,
      currency,
      address,
      isActive,
      selectedMenuIds,
      workingHours,
      cuisineType,
      paymentMethods,
      socialMediaLinks,
      ownerId,
      createdBy,
      lastModifiedBy,
      tags,
      images,
      logo,
    };

    const updatedRestaurant = await Restaurant.findByIdAndUpdate(
      req.params.id,
      updatedData,
      { new: true }
    );

    if (updatedRestaurant) {
      res.send({ message: "Restaurant Updated", updatedRestaurant });
    } else {
      res.status(404).send({ message: "Restaurant Not Found" });
    }
  } catch (error) {
    res.status(500).send({ message: "Server Error" });
  }
});

exports.deleteRestaurant = expressAsyncHandler(async (req, res) => {
  const restaurant = await Restaurant.findById(req.params.id);

  if (restaurant) {
    await Restaurant.findByIdAndDelete(req.params.id);
    res.send({ message: "Restaurant Deleted" });
  } else {
    res.status(404).send({ message: "Restaurant Not Found" });
  }
});
