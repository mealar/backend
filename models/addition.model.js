const mongoose = require("mongoose");

const additionSchema = new mongoose.Schema({
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
}, {
  timestamps: true,
});

module.exports = additionSchema;
