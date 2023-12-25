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
});

const additionGroupSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
  },
  additionObjects: [
    {
      type: additionSchema,
    },
  ],
  default: {
    type: additionSchema,
  },
  createdBy: {
    type: String,
  },
  isRequired: { type: Boolean, default: false },
  lastModifiedBy: String,
});

const dishSchema = new mongoose.Schema(
  {
    restaurantId: {
      type: mongoose.ObjectId,
      required: true,
    },
    categoryId: [
      {
        type: mongoose.ObjectId,
        required: true,
      },
    ],
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },

    additions: [{ type: additionGroupSchema }],
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
dishSchema.add({
  entities: {
    dish: [{ type: dishSchema }],
  },
});
const Dish = mongoose.model("Dish", dishSchema);

module.exports = { Dish, dishSchema };
