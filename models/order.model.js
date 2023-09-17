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
    actualPreparationTime: { type: Number, required: true },
    estimatedPreparationTime: { type: Number, required: true },
    deliveryTime: {
      type: Date,
      required: true,
    },
    loyaltyPointsEarned: { type: Number, required: true },
    customerFeedback: { type: String }, //order sonrası mı???
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
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
