const mongoose = require("mongoose");

const DishSchema = new mongoose.Schema({
  dishId: {
    type: mongoose.ObjectId,
    required: true,
  },
  dishName: String,
  additions: [
    {
      groupId: {
        type: mongoose.ObjectId,
        required: true,
      },
      groupName: {
        type: String,
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
    },
  ],
  dishPrice: Number,
  count: Number,
});

DishSchema.pre("save", function (next) {
  this.dishPrice =
    this.additions.reduce((a, b) => a + b.price, 0) + this.dish.price;
  next();
});

const MenuSchema = new mongoose.Schema({
  menuId: {
    type: mongoose.ObjectId,
    required: true,
  },
  menuName: String,
  additions: [
    {
      groupId: {
        type: mongoose.ObjectId,
        required: true,
      },
      groupName: {
        type: String,
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
    },
  ],
  menuPrice: Number,
  count: Number,
});

MenuSchema.pre("save", function (next) {
  this.menuPrice =
    this.additions.reduce((a, b) => a + b.price, 0) + this.menu.price;
  next();
});

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.ObjectId,
      required: true,
    },
    restaurantId: {
      type: mongoose.ObjectId,
      required: true,
    },
    deliveryTable: {
      tableId: {
        type: mongoose.ObjectId,
        required: true,
      },
      tableNumber: { type: Number, required: true },
      seatingCapacity: { type: Number, required: true },
      qrCode: { type: String, required: true },
    },
    dishes: [DishSchema],
    menus: [MenuSchema],
    totalPrice: Number,
  },
  {
    timestamps: true,
  }
);

orderSchema.pre("save", function (next) {
  this.totalPrice =
    this.dishes.reduce((a, b) => a + b.dishPrice * b.count, 0) +
    this.menus.reduce((a, b) => a + b.menuPrice * b.count, 0);
  next();
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
