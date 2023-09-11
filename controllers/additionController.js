const expressAsyncHandler = require("express-async-handler");
const { Addition } = require("../models");

const createAddition = expressAsyncHandler(async (req, res) => {
  const addition = new Addition(req.body);
  try {
    const newAddition = await addition.save();
    res.status(201).json(newAddition);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = {
  createAddition,
};
