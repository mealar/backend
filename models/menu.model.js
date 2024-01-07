const mongoose = require("mongoose");
const { Dish } = require("./dish.model");
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
      dish: [{ type: mongoose.ObjectId, ref: "Dish" }],
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
    menu: [{ type: mongoose.ObjectId, ref: "Menu" }],
  },
});

menuSchema.pre("save", async function (next) {
  try {
    const menu = this;
    await menu.populate("entities.dish", "additions").execPopulate();
    menu.entities.dish.forEach((dish) => {
      menu.additions.push(...dish.additions);
    });

    next();
  } catch (error) {
    next(error);
  }
});
const Menu = mongoose.model("Menu", menuSchema);

module.exports = { Menu, menuSchema };
