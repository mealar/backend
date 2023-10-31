const mongoose = require("mongoose");

const menuSchema = new mongoose.Schema(
  {
    restaurantId: {
      type: mongoose.ObjectId,
      required: true,
    },
    categoryId: {
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
      dish: [{ type: mongoose.ObjectId, ref: "dish" }],
      menu: [{ type: mongoose.ObjectId, ref: "menu" }],
    },
    additions: [{ type: mongoose.ObjectId, ref: "additionGroup" }],
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
menuSchema.add({
  entities: {
    menu: [{ type: mongoose.ObjectId }],
  },
});
const Menu = mongoose.model("Menu", menuSchema);

module.exports = Menu;
