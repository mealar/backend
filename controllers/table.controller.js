const expressAsyncHandler = require("express-async-handler");
const { Table, Restaurant } = require("../models");

const createTable = expressAsyncHandler(async (req, res) => {
  const { restaurantId } = req.body;
  const restaurant = await Restaurant.findOne({ _id: restaurantId });
  if (!restaurant) {
    res.status(404).send({ message: "Restaurant Not Found" });
  }
  const table = new Table(req.body);
  const newTable = await table.save();
  restaurant.tables.push(newTable);
  restaurant.save();
  res.status(201).json(newTable);
});

const getTables = expressAsyncHandler(async (req, res) => {
  const { restaurantId } = req.params;
  const restaurant = await Restaurant.findOne({ _id: restaurantId });
  if (!restaurant) {
    res.status(404).send({ message: "Restaurant Not Found" });
  }
  const tables = await Table.find({ restaurantId });
  if (!tables) {
    res.status(404).send({ message: "Tables Not Found" });
  }
  res.status(201).json(tables);
});

module.exports = {
  createTable,
  getTables,
};
