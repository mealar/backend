const mongoose = require("mongoose");
const dishSchema = require("./dish.model");
const menuSchema = require("./menu.model");
const tableSchema = require("./table.model");
const additionSchema = require("./addition.model");

const orderedDishSchema = new mongoose.Schema({
  dish: dishSchema,
  additions: [additionSchema],
  dishPrice: Number,
  count: Number,
});

orderedDishSchema.pre("save", function (next) {
  this.dishPrice = this.additions.reduce((a, b) => a + b.price, 0) + this.dish.price;
  next();
});

const orderedMenuSchema = new mongoose.Schema({
  menu: menuSchema,
  additions: [additionSchema],
  menuPrice: Number,
  count: Number,
});

orderedMenuSchema.pre("save", function (next) {
  this.menuPrice = this.additions.reduce((a, b) => a + b.price, 0) + this.menu.price;
  next();
});

const orderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.ObjectId,
    required: true,
  },
  restaurantId: {
    type: mongoose.ObjectId,
    required: true,
  },
  table: tableSchema,
  dishes: [orderedDishSchema],
  menus: [orderedMenuSchema],
  totalPrice: Number,
}, {
  timestamps: true,
});

orderSchema.pre("save", function (next) {
  this.totalPrice =
    this.dishes.reduce((a, b) => a + (b.dishPrice * b.count), 0) +
    this.menus.reduce((a, b) => a + (b.menuPrice * b.count), 0);
  next();
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
