const mongoose = require("mongoose");
const dishSchema = require("./dish.model");
const menuSchema = require("./menu.model");

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  entities: {
    dish: [dishSchema],
    menu: [menuSchema],
    // We'll add the category embedding below
  },
  isActive: Boolean,
  createdBy: String,
  expiryDateTime: Date,
  images: [{
    url: String,
    altText: String,
  }],
  lastModifiedBy: String,
}, {
  timestamps: true,
});

// Now, add the embedded categories to the entities field
categorySchema.add({
  entities: {
    category: [categorySchema],
  }
});

module.exports = categorySchema;
