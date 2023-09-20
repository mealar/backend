const Joi = require("joi");
const objectId = (value, helpers) => {
  if (!value.match(/^[0-9a-fA-F]{24}$/)) {
    return helpers.message('"{{#label}}" must be a valid mongo id');
  }
  return value;
};

const createOrder = (data) => {
  const schema = Joi.object({
    restaurantId: Joi.string().custom(objectId).required(),
    deliveryTable: Joi.number().required(),
    dishes: Joi.array().items({
      dishId: Joi.string().custom(objectId),
      additions: Joi.array().items({
        additionGroupId: Joi.string().custom(objectId),
        additionId: Joi.string().custom(objectId),
      }),
    }),
    menus: Joi.array().items({
      dishId: Joi.string().custom(objectId),
      additions: Joi.array().items({
        additionGroupId: Joi.string().custom(objectId),
        additionId: Joi.string().custom(objectId),
      }),
    }),
  });
  return schema.validate(data);
};
const getOrders = (data) => {
  const schema = Joi.object({
    restaurantId: Joi.string().custom(objectId).required(),
  });
  return schema.validate(data);
};

module.exports = {
  createOrder,
  getOrders,
};
