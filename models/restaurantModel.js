const mongoose = require("mongoose");

// Restaurant Şema tanımı
const restaurantSchema = new mongoose.Schema(
  {
    name: {
      en: { type: String, required: true },
      tr: { type: String, required: true },
    },
    currency: { type: String, required: true },
    address: {
      readableAddress: {
        en: { type: String, required: true },
        tr: { type: String, required: true },
      },
      coordinates: {
        type: { type: String, enum: ["Point"], required: true },
        coordinates: { type: [Number], required: true },
      },
    },
    isActive: { type: Boolean, required: true },
    selectedMenuIds: [{ type: String, required: true }],
    workingHours: {
      monday: { start: String, end: String },
      tuesday: { start: String, end: String },
      wednesday: { start: String, end: String },
      thursday: { start: String, end: String },
      friday: { start: String, end: String },
      saturday: { start: String, end: String },
      sunday: { start: String, end: String },
    },
    cuisineType: {
      en: { type: String, required: true },
      tr: { type: String, required: true },
    },
    paymentMethods: {
      en: {
        cash: { type: String, required: true },
        creditCard: { type: String, required: true },
        onlinePayment: { type: String, required: true },
      },
      tr: {
        cash: { type: String, required: true },
        creditCard: { type: String, required: true },
        onlinePayment: { type: String, required: true },
      },
    },
    ownerId: { type: String, required: true },
    socialMediaLinks: {
      instagram: { type: String, required: true },
      facebook: { type: String, required: true },
      twitter: { type: String, required: true },
    },
    createdBy: { type: String, required: true },
    lastModifiedBy: { type: String, required: true },
    tags: {
      familyFriendly: { type: Boolean, required: true },
      veganOptions: { type: Boolean, required: true },
      halalOptions: { type: Boolean, required: true },
      servesAlcohol: { type: Boolean, required: true },
    },
    images: [
      {
        url: { type: String, required: true },
        altText: {
          en: { type: String, required: true },
          tr: { type: String, required: true },
        },
      },
    ],
    logo: {
      url: { type: String, required: true },
      altText: {
        en: { type: String, required: true },
        tr: { type: String, required: true },
      },
    },
  },
  {
    timestamps: true,
  }
);

// Şema içeriğine göre Restaurant modeli oluşturma
const Restaurant = mongoose.model("Restaurant", restaurantSchema);

module.exports = Restaurant;
