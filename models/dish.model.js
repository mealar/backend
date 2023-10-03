const mongoose = require("mongoose");
const additionGroupSchema = require("./additionGroup.model");
const allergenSchema = require("./allergen.model");

const dishSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    additions: [additionGroupSchema],
    ingredients: [
      {
        name: String,
        optional: Boolean,
      },
    ],
    allergens: [allergenSchema],
    availability: Boolean,
    isHalal: Boolean,
    isVegan: Boolean,
    healthRecommendations: [String],
    tags: [String],
    isActive: Boolean,
    isApproved: Boolean,
    createdBy: String,
    lastModifiedBy: String,
    expiryDateTime: Date,
    images: [
      {
        url: String,
        altText: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = dishSchema;
