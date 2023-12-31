const Joi = require("joi");
const objectId = (value, helpers) => {
  if (!value.match(/^[0-9a-fA-F]{24}$/)) {
    return helpers.message('"{{#label}}" must be a valid mongo id');
  }
  return value;
};

const createDish = {
  body: Joi.object({
    restaurantId: Joi.string().custom(objectId).required(),
    categoryId: Joi.array().items(Joi.string().custom(objectId)).min(1),
    name: Joi.string().required().max(30),
    description: Joi.string().required().max(200),
    ingredients: Joi.array().items({
      name: Joi.string(),
      optional: Joi.boolean(),
    }),
    allergens: Joi.array().items(Joi.string().custom(objectId)),
    availability: Joi.boolean(),
    isHelal: Joi.boolean().default(false),
    isVegan: Joi.boolean().default(false),
    healthRecommendations: Joi.array().items(Joi.string()),
    tags: Joi.array().items(Joi.string()),
    isActive: Joi.boolean().default(false),
    isApproved: Joi.boolean().default(false),
    createdBy: Joi.string().required(),
    lastModifiedBy: Joi.string().required(),
    expiryDateTime: Joi.date().required(),
    images: Joi.array().items({
      url: Joi.string().required(),
      altText: Joi.string().required(),
    }),
  }),
};

const getDishes = {
  params: Joi.object({
    restaurantId: Joi.string().custom(objectId),
  }),
};
const addDishtoMenu = {
  body: Joi.object().keys({
    menuId: Joi.string().custom(objectId).required(),
    dishId: Joi.string().custom(objectId).required(),
  }),
};
const addDishtoDish = {
  body: Joi.object().keys({
    dish1Id: Joi.string().custom(objectId).required(),
    dish2Id: Joi.string().custom(objectId).required(),
  }),
};

module.exports = {
  createDish,
  getDishes,
  addDishtoDish,
  addDishtoMenu,
};
