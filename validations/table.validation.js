const Joi = require("joi");
const objectId = (value, helpers) => {
  if (!value.match(/^[0-9a-fA-F]{24}$/)) {
    return helpers.message('"{{#label}}" must be a valid mongo id');
  }
  return value;
};

const createTable = {
  body: Joi.object({
    restaurantId: Joi.string().custom(objectId).required(),
    table_name: Joi.string().required(),
    table_location: Joi.string().required(),
    table_note: Joi.string().required(),
    seatingCapacity: Joi.number().required(),
    qrCode: Joi.string().required(),
    isActive: Joi.boolean(),
    createdBy: Joi.string().required(),
  }),
};
const getTables = {
  params: Joi.object().keys({
    restaurantId: Joi.string().custom(objectId).required(),
  }),
};

module.exports = {
  createTable,
  getTables,
};
