const Joi = require("joi");
const objectId = (value, helpers) => {
  if (!value.match(/^[0-9a-fA-F]{24}$/)) {
    return helpers.message('"{{#label}}" must be a valid mongo id');
  }
  return value;
};

const getOwnerRestaurants = {
  body: Joi.object().keys({
    ownerId: Joi.string().required(),
  }),
};
const getRestaurant = {
  params: Joi.object().keys({
    restaurantId: Joi.string().custom(objectId).required(),
  }),
};
const deleteRestaurant = {
  params: Joi.object().keys({
    restaurantId: Joi.string().custom(objectId).required(),
  }),
};

const createRestaurant = {
  body: Joi.object().keys({
    name: Joi.string().required().max(30),
    currency: Joi.string().required().valid("TRY", "USD"),
    isActive: Joi.boolean().default(false),
    address: {
      readableAddress: Joi.string().required(),
      coordinates: Joi.array().max(2).required(),
    },
    cuisineType: Joi.string().required().valid("Turkish", "India"),
    paymentMethods: Joi.string().valid("cash", "creditCard", "noPayment"),
    ownerId: Joi.string().max(36).required(),
    selectedMenuIds: Joi.string().custom(objectId),
    categories: Joi.array().items(Joi.string().custom(objectId)),
    workingHours: {
      monday: {
        start: Joi.string()
          .pattern(/^([01]\d|2[0-3]):([0-5]\d)$/)
          .required(),
        end: Joi.string()
          .pattern(/^([01]\d|2[0-3]):([0-5]\d)$/)
          .required(),
      },
      tuesday: {
        start: Joi.string()
          .pattern(/^([01]\d|2[0-3]):([0-5]\d)$/)
          .required(),
        end: Joi.string()
          .pattern(/^([01]\d|2[0-3]):([0-5]\d)$/)
          .required(),
      },
      wednesday: {
        start: Joi.string()
          .pattern(/^([01]\d|2[0-3]):([0-5]\d)$/)
          .required(),
        end: Joi.string()
          .pattern(/^([01]\d|2[0-3]):([0-5]\d)$/)
          .required(),
      },
      thursday: {
        start: Joi.string()
          .pattern(/^([01]\d|2[0-3]):([0-5]\d)$/)
          .required(),
        end: Joi.string()
          .pattern(/^([01]\d|2[0-3]):([0-5]\d)$/)
          .required(),
      },
      friday: {
        start: Joi.string()
          .pattern(/^([01]\d|2[0-3]):([0-5]\d)$/)
          .required(),
        end: Joi.string()
          .pattern(/^([01]\d|2[0-3]):([0-5]\d)$/)
          .required(),
      },
      saturday: {
        start: Joi.string()
          .pattern(/^([01]\d|2[0-3]):([0-5]\d)$/)
          .required(),
        end: Joi.string()
          .pattern(/^([01]\d|2[0-3]):([0-5]\d)$/)
          .required(),
      },
      sunday: {
        start: Joi.string()
          .pattern(/^([01]\d|2[0-3]):([0-5]\d)$/)
          .required(),
        end: Joi.string()
          .pattern(/^([01]\d|2[0-3]):([0-5]\d)$/)
          .required(),
      },
    },
    socialMediaLinks: {
      instagram: Joi.string().required(),
      facebook: Joi.string().required(),
      twitter: Joi.string().required(),
    },
    createdBy: Joi.string().required(),
    lastModifiedBy: Joi.string().required(),
    tags: {
      familyFriendly: Joi.boolean().required(),
      veganOptions: Joi.boolean().required(),
      halalOptions: Joi.boolean().required(),
      servesAlcohol: Joi.boolean().required(),
    },
    images: Joi.array().items({
      url: Joi.string().required(),
      altText: Joi.string().required(),
    }),
    logo: { url: Joi.string().required(), altText: Joi.string().required() },
  }),
};
const updateRestaurant = {
  params: Joi.object().keys({
    restaurantId: Joi.string().custom(objectId).required(),
  }),
  body: Joi.object().keys({
    name: Joi.string().max(30),
    currency: Joi.string().valid("TRY", "USD"),
    isActive: Joi.boolean().default(false),
    address: {
      readableAddress: Joi.string().required(),
      coordinates: Joi.array().max(2).required(),
    },
    cuisineType: Joi.string().valid("Turkish", "India"),
    paymentMethods: Joi.string().valid("cash", "creditCard", "noPayment"),
    ownerId: Joi.string().max(36),
    selectedMenuIds: Joi.array().max(1),
    categories: Joi.array().items(Joi.string().custom(objectId)),
    workingHours: {
      monday: {
        start: Joi.string()
          .pattern(/^([01]\d|2[0-3]):([0-5]\d)$/)
          .required(),
        end: Joi.string()
          .pattern(/^([01]\d|2[0-3]):([0-5]\d)$/)
          .required(),
      },
      tuesday: {
        start: Joi.string()
          .pattern(/^([01]\d|2[0-3]):([0-5]\d)$/)
          .required(),
        end: Joi.string()
          .pattern(/^([01]\d|2[0-3]):([0-5]\d)$/)
          .required(),
      },
      wednesday: {
        start: Joi.string()
          .pattern(/^([01]\d|2[0-3]):([0-5]\d)$/)
          .required(),
        end: Joi.string()
          .pattern(/^([01]\d|2[0-3]):([0-5]\d)$/)
          .required(),
      },
      thursday: {
        start: Joi.string()
          .pattern(/^([01]\d|2[0-3]):([0-5]\d)$/)
          .required(),
        end: Joi.string()
          .pattern(/^([01]\d|2[0-3]):([0-5]\d)$/)
          .required(),
      },
      friday: {
        start: Joi.string()
          .pattern(/^([01]\d|2[0-3]):([0-5]\d)$/)
          .required(),
        end: Joi.string()
          .pattern(/^([01]\d|2[0-3]):([0-5]\d)$/)
          .required(),
      },
      saturday: {
        start: Joi.string()
          .pattern(/^([01]\d|2[0-3]):([0-5]\d)$/)
          .required(),
        end: Joi.string()
          .pattern(/^([01]\d|2[0-3]):([0-5]\d)$/)
          .required(),
      },
      sunday: {
        start: Joi.string()
          .pattern(/^([01]\d|2[0-3]):([0-5]\d)$/)
          .required(),
        end: Joi.string()
          .pattern(/^([01]\d|2[0-3]):([0-5]\d)$/)
          .required(),
      },
    },
    socialMediaLinks: {
      instagram: Joi.string().required(),
      facebook: Joi.string().required(),
      twitter: Joi.string().required(),
    },
    createdBy: Joi.string(),
    lastModifiedBy: Joi.string(),
    tags: {
      familyFriendly: Joi.boolean().required(),
      veganOptions: Joi.boolean().required(),
      halalOptions: Joi.boolean().required(),
      servesAlcohol: Joi.boolean().required(),
    },
    images: Joi.array().items({
      url: Joi.string().required(),
      altText: Joi.string().required(),
    }),
    logo: { url: Joi.string().required(), altText: Joi.string().required() },
  }),
};

const selectMenu = {
  body: Joi.object().keys({
    restaurantId: Joi.string().custom(objectId).required(),
    menuId: Joi.string().custom(objectId).required(),
  }),
};

module.exports = {
  createRestaurant,
  updateRestaurant,
  getOwnerRestaurants,
  deleteRestaurant,
  getRestaurant,
  selectMenu,
};
