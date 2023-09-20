const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    restaurantId: {
      type: mongoose.ObjectId,
      required: true,
    },
    deliveryTable: {
      type: Number,
      required: true,
    },

    dishes: [
      {
        dishId: { type: mongoose.ObjectId, ref: "Dish" },
        additions: [
          {
            additionGroupId: { type: mongoose.ObjectId, ref: "additionGroup" },
            additionId: { type: mongoose.ObjectId, ref: "addition" },
          },
        ],
      },
    ],
    menus: [
      {
        dishId: { type: mongoose.ObjectId, ref: "Menu" },
        additions: [
          {
            additionGroupId: { type: mongoose.ObjectId, ref: "additionGroup" },
            additionId: { type: mongoose.ObjectId, ref: "addition" },
          },
        ],
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
