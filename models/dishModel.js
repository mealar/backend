const mongoose = require("mongoose");

const dishSchema = new mongoose.Schema(
  {
    restaurantId: {
      type: mongoose.ObjectId,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    additions: [{ type: mongoose.ObjectId, ref: "additionGroup" }],
    ingredients: [
      {
        name: String,
        optional: Boolean,
      },
    ],
    allergens: [mongoose.ObjectId],
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

const Dish = mongoose.model("Dish", dishSchema);

module.exports = Dish;
