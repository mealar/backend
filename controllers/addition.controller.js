const expressAsyncHandler = require("express-async-handler");
const { Addition, AdditionGroup } = require("../models");

const createAddition = expressAsyncHandler(async (req, res) => {
  const { groupId } = req.body;
  const group = await AdditionGroup.findOne({ _id: groupId });
  if (!group) {
    res.status(404).send({ message: "Group Not Found" });
  }
  const addition = new Addition(req.body);
  try {
    const newAddition = await addition.save();
    group.additionObjects.push(newAddition._id);
    if (req.body.default) group.default = newAddition._id;
    await group.save();
    res.status(201).json(newAddition);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = {
  createAddition,
};
