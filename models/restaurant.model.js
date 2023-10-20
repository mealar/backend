const mongoose = require("mongoose");

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
    type: mongoose.ObjectId,
    ref: "addition",
  },
  createdBy: {
    type: String,
    required: true,
  },
  isRequired: { type: Boolean, default: false },
  lastModifiedBy: String,
});
const dishSchema = new mongoose.Schema({
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
  additions: [{ type: additionGroupSchema }],
  ingredients: [
    {
      name: String,
      optional: Boolean,
    },
  ],
  allergens: [mongoose.ObjectId],
  availability: Boolean,
  isHalal: Boolean,
  isVegan: Boolean,
  healthRecommendations: [String],
  tags: [String],
  isActive: Boolean,
  isApproved: Boolean,
  createdBy: String,
  lastModifiedBy: String,
  expiryDateTime: Date,
  images: [
    {
      url: String,
      altText: String,
    },
  ],
});
const menuSchema = new mongoose.Schema({
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
});
const categorySchema = new mongoose.Schema({
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
        type: dishSchema,
      },
    ],
    menu: [
      {
        type: menuSchema,
      },
    ],
    category: [
      {
        type: categorySchema,
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
});

const restaurantSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    currency: {
      type: String,
      enum: ["TRY", "USD"],
      required: true,
    },
    address: {
      readableAddress: {
        type: String,
        required: true,
      },
      coordinates: { type: [Number], required: true },
    },
    isActive: { type: Boolean, required: true },
    selectedMenu: {
      type: Object,
    },
    categories: [
      {
        type: categorySchema,
      },
    ],

    workingHours: {
      monday: { start: String, end: String }, //end>start
      tuesday: { start: String, end: String },
      wednesday: { start: String, end: String },
      thursday: { start: String, end: String },
      friday: { start: String, end: String },
      saturday: { start: String, end: String },
      sunday: { start: String, end: String },
    },
    cuisineType: {
      type: String,
      enum: ["Turkish", "India"],
      required: true,
    },
    paymentMethods: {
      type: String,
      enum: ["cash", "creditCard", "noPayment"],
      required: true,
    },
    status: {
      type: String,
      enum: ["active", "draft", "deleted"],
      default: "active",
    },

    ownerId: { type: String, required: true }, //tokendan al
    socialMediaLinks: {
      instagram: { type: String },
      facebook: { type: String },
      twitter: { type: String },
    },
    createdBy: { type: String, required: true }, //tokendan al
    lastModifiedBy: { type: String, required: true }, //tokendan al
    tags: {
      familyFriendly: { type: Boolean, required: true },
      veganOptions: { type: Boolean, required: true },
      halalOptions: { type: Boolean, required: true },
      servesAlcohol: { type: Boolean, required: true },
    },
    images: {
      url: { type: String, required: true },
      altText: {
        type: String,
      },
    },
    logo: {
      url: { type: String, required: true },
      altText: {
        type: String,
        required: true,
      },
    },
    tables: [Object],
    orders: [Object],
  },

  {
    timestamps: true,
  }
);

const Restaurant = mongoose.model("Restaurant", restaurantSchema);

module.exports = Restaurant;
