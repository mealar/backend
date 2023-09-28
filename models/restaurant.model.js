const mongoose = require("mongoose");
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
    selectedMenuIds: {
      type: mongoose.ObjectId,
      ref: "Menu",
    },
    categories: {
      type: [mongoose.ObjectId],
      ref: "Category",
    },
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
  },
  {
    timestamps: true,
  }
);

const Restaurant = mongoose.model("Restaurant", restaurantSchema);

module.exports = Restaurant;
