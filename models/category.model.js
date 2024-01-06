const mongoose = require("mongoose");
const { dishSchema } = require("./dish.model");
const { menuSchema } = require("./menu.model");

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
categorySchema.add({
  entities: {
    category: [{ type: mongoose.ObjectId, ref: "Category" }],
  },
});
const Category = mongoose.model("Category", categorySchema);
module.exports = { Category, categorySchema };
