const expressAsyncHandler = require("express-async-handler");
const { AdditionGroup } = require("../models");
const { additionGroupValidation } = require("../validations");

const createAdditionGroup = expressAsyncHandler(async (req, res) => {
  const { error } = additionGroupValidation.createAdditionGroup(req.body);
  if (error) return res.status(400).send({ message: error.details[0].message });
  const group = new AdditionGroup(req.body);
  await group.save();
  res.status(201).json(group);
});

module.exports = {
  createAdditionGroup,
};
