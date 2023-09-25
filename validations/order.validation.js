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
    deliveryTable: Joi.object({
      tableId: Joi.string().custom(objectId).required(),
      tableNumber: Joi.number().required(),
      seatingCapacity: Joi.number().required(),
      qrCode: Joi.string().required(),
    }).required(),
    dishes: Joi.array().items({
      dishId: Joi.string().custom(objectId).required(),
      dishName: Joi.string().required(),
      count: Joi.number().required(),
      additions: Joi.array().items({
        groupId: Joi.string().custom(objectId).required(),
        groupName: Joi.string().required(),
        name: Joi.string().required(),
        _id: Joi.string().custom(objectId).required(),
        price: Joi.number().required(),
      }),
    }),
    menus: Joi.array().items({
      menuId: Joi.string().custom(objectId).required(),
      menuName: Joi.string().required(),
      count: Joi.number().required(),
      additions: Joi.array().items({
        groupId: Joi.string().custom(objectId).required(),
        groupName: Joi.string().required(),
        name: Joi.string().required(),
        _id: Joi.string().custom(objectId).required(),
        price: Joi.number().required(),
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
