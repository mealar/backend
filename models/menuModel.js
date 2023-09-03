const mongoose = require("mongoose");

const menuSchema = new mongoose.Schema(
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
    entities: [
      {
        status: {
          type: String,
          enum: ["dish", "menu", "category"],
          required: true,
        },
        items: [mongoose.ObjectId],
      },
    ],
    sizeOptions: [
      {
        name: {
          type: String,
          enum: ["small", "standart", "large"],
          required: true,
        },
        price: Number,
        calories: String,
      },
    ],
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

const Menu = mongoose.model("Menu", menuSchema);

module.exports = Menu;
