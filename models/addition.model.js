const mongoose = require("mongoose");

const additionSchema = new mongoose.Schema(
  {
    groupId: { type: mongoose.ObjectId, ref: "additionGroup" },
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    calories: {
      type: String,
      required: true,
    },
    default: {
      type: Boolean,
    },
  },
  {
    timestamps: true,
  }
);

const addition = mongoose.model("addition", additionSchema);

module.exports = addition;
