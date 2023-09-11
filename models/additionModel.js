const mongoose = require("mongoose");

const additonSchema = new mongoose.Schema(
  {
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
  },
  {
    timestamps: true,
  }
);

const additon = mongoose.model("additon", additonSchema);

module.exports = additon;
