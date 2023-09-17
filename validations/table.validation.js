const Joi = require("joi");
const objectId = (value, helpers) => {
  if (!value.match(/^[0-9a-fA-F]{24}$/)) {
    return helpers.message('"{{#label}}" must be a valid mongo id');
  }
  return value;
};

const createTable = (data) => {
  const schema = Joi.object({
    restaurantId: Joi.string().custom(objectId).required(),
    tableNumber: Joi.number().required(),
    seatingCapacity: Joi.number().required(),
    qrCode: Joi.string().required(),
    isActive: Joi.boolean(),
    createdBy: Joi.string().required(),
  });
  return schema.validate(data);
};
const getTables = (data) => {
  const schema = Joi.object({
    restaurantId: Joi.string().custom(objectId).required(),
  });
  return schema.validate(data);
};

module.exports = {
  createTable,
  getTables,
};
