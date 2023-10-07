const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
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
