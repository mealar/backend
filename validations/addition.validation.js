const Joi = require("joi");
const objectId = (value, helpers) => {
  if (!value.match(/^[0-9a-fA-F]{24}$/)) {
    return helpers.message('"{{#label}}" must be a valid mongo id');
  }
  return value;
};

const createAdditionForDish = {
  body: Joi.object({
    groupName: Joi.string().required(),
    restaurantId: Joi.string().custom(objectId),
    dishId: Joi.string().custom(objectId).required(),
    default: Joi.boolean(),
    calories: Joi.string().required(),
    name: Joi.string().required(),
    price: Joi.number().required(),
  }),
};
const createAdditionForMenu = {
  body: Joi.object({
    groupName: Joi.string().required(),
    restaurantId: Joi.string().custom(objectId),
    menuId: Joi.string().custom(objectId).required(),
    default: Joi.boolean(),
    calories: Joi.string().required(),
    name: Joi.string().required(),
    price: Joi.number().required(),
  }),
};

module.exports = {
  createAdditionForDish,
  createAdditionForMenu,
};
