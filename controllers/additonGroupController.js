const expressAsyncHandler = require("express-async-handler");
const { AdditionGroup } = require("../models");

const createAdditionGroup = expressAsyncHandler(async (req, res) => {
  const addition = new AdditionGroup(req.body);
  try {
    const newAddition = await addition.save();
    res.status(201).json(newAddition);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = {
  createAdditionGroup,
};
