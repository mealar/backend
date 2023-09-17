const expressAsyncHandler = require("express-async-handler");
const { Table, Restaurant } = require("../models");
const { tableValidation } = require("../validations");

const createTable = expressAsyncHandler(async (req, res) => {
  const { error } = tableValidation.createTable(req.body);
  if (error) return res.status(400).send({ message: error.details[0].message });
  const { restaurantId } = req.body;
  const restaurant = await Restaurant.findOne({ _id: restaurantId });
  if (!restaurant) {
    res.status(404).send({ message: "Restaurant Not Found" });
  }
  const table = new Table(req.body);
  try {
    const newTable = await table.save();
    res.status(201).json(newTable);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
const getTables = expressAsyncHandler(async (req, res) => {
  const { error } = tableValidation.getTables(req.body);
  if (error) return res.status(400).send({ message: error.details[0].message });
  const { restaurantId } = req.body;
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
