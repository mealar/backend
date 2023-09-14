const expressAsyncHandler = require("express-async-handler");
const { Addition } = require("../models");
const { additionValidation } = require("../validations");

const createAddition = expressAsyncHandler(async (req, res) => {
  const { error } = additionValidation.createAddition(req.body);
  if (error) return res.status(400).send({ message: error.details[0].message });
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
