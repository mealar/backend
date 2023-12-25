const mongoose = require("mongoose");
const { dishSchema } = require("./dish.model");
const additionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  calories: {
    type: String,
    required: true,
  },
  default: {
    type: Boolean,
  },
});

const additionGroupSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  additionObjects: [
    {
      type: additionSchema,
    },
  ],
  default: {
    type: additionSchema,
  },
  createdBy: {
    type: String,
    required: true,
  },
  isRequired: { type: Boolean, default: false },
  lastModifiedBy: String,
});

const menuSchema = new mongoose.Schema(
  {
    restaurantId: {
      type: mongoose.ObjectId,
      required: true,
    },
    categoryId: [
      {
        type: mongoose.ObjectId,
        required: true,
      },
    ],
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    entities: {
      dish: [{ type: dishSchema }],
    },
    additions: [{ type: additionGroupSchema }],
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
    menu: [{ type: menuSchema }],
  },
});
const Menu = mongoose.model("Menu", menuSchema);

module.exports = { Menu, menuSchema };
