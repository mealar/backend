const mongoose = require("mongoose");
const dishSchema = require("./dish.model");
const additionGroupSchema = require("./additionGroup.model");

const menuSchema = new mongoose.Schema({
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
    // We'll add the menu embedding below
  },
  additions: [additionGroupSchema],
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

// Now, add the embedded menus to the entities field
menuSchema.add({
  entities: {
    menu: [menuSchema],
  }
});

module.exports = menuSchema;
