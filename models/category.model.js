const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
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
    entities: {
      dish: [
        {
          type: mongoose.ObjectId,
          ref: "Dish",
        },
      ],
      menu: [
        {
          type: mongoose.ObjectId,
          ref: "Menu",
        },
      ],
      category: [
        {
          type: mongoose.ObjectId,
          ref: "Category",
        },
      ],
    },
    isActive: Boolean,
    createdBy: String,
    expiryDateTime: Date,
    images: [
      {
        url: String,
        altText: String,
      },
    ],
    lastModifiedBy: String,
  },
  {
    timestamps: true,
  }
);

const Category = mongoose.model("Category", categorySchema);
module.exports = Category;
