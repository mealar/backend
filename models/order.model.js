const mongoose = require("mongoose");

const dishSchema = new mongoose.Schema({
  dishId: {
    type: mongoose.ObjectId,
    required: true,
  },
  dishName: {
    type: String,
    required: true,
  },
  additions: [
    {
      groupId: {
        type: mongoose.ObjectId,
      },
      groupName: {
        type: String,
      },
      _Id: {
        type: mongoose.ObjectId,
      },
      name: {
        type: String,
      },
      price: {
        type: Number,
      },
    },
  ],
  dishPrice: {
    type: Number,
  },
  count: {
    type: Number,
    required: true,
  },
});
dishSchema.pre("save", function (next) {
  this.dishPrice = this.additions.reduce((a, b) => a + b.price, 0);
  next();
});

const menuSchema = new mongoose.Schema({
  menuId: {
    type: mongoose.ObjectId,
    required: true,
  },
  menuName: {
    type: String,
    required: true,
  },
  additions: [
    {
      groupId: {
        type: mongoose.ObjectId,
      },
      groupName: {
        type: String,
      },
      _Id: {
        type: mongoose.ObjectId,
      },
      name: {
        type: String,
      },
      price: {
        type: Number,
      },
    },
  ],
  menuPrice: {
    type: Number,
  },
  count: {
    type: Number,
    required: true,
  },
});
menuSchema.pre("save", function (next) {
  this.menuPrice = this.additions.reduce((a, b) => a + b.price, 0);
  next();
});

const orderSchema = new mongoose.Schema(
  {
    restaurantId: {
      type: mongoose.ObjectId,
    },
    deliveryTable: {
      tableId: {
        type: mongoose.ObjectId,
      },
      tableNumber: {
        type: Number,
      },
      seatingCapacity: {
        type: Number,
      },
      qrCode: {
        type: String,
      },
    },

    dishes: [dishSchema],
    menus: [menuSchema],
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
