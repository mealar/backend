const Joi = require("joi");
const objectId = (value, helpers) => {
  if (!value.match(/^[0-9a-fA-F]{24}$/)) {
    return helpers.message('"{{#label}}" must be a valid mongo id');
  }
  return value;
};

const createMenu = (data) => {
  const schema = Joi.object({
    categoryId: Joi.string().custom(objectId).required(),
    name: Joi.string().required().max(30),
    description: Joi.string().required().max(100),
    isActive: Joi.boolean().default(false),
    entities: Joi.object({
      dish: Joi.array(),
      menu: Joi.array(),
    }),
    additions: Joi.array(),
    createdBy: Joi.string().required(),
    expiryDateTime: Joi.date().required(),
    lastModifiedBy: Joi.string().required(),
    images: Joi.array().items({
      url: Joi.string().required(),
      altText: Joi.string().required(),
    }),
  });
  return schema.validate(data);
};

const getMenus = (data) => {
  const schema = Joi.object({
    restaurantId: Joi.string().custom(objectId),
  });
  return schema.validate(data);
};
module.exports = {
  createMenu,
  getMenus,
};
