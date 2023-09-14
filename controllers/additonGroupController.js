const expressAsyncHandler = require("express-async-handler");
const { AdditionGroup } = require("../models");
const { additionGroupValidation } = require("../validations");

const createAdditionGroup = expressAsyncHandler(async (req, res) => {
  const { error } = additionGroupValidation.createAdditionGroup(req.body);
  if (error) return res.status(400).send({ message: error.details[0].message });
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
