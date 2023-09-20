const Joi = require("joi");
const objectId = (value, helpers) => {
  if (!value.match(/^[0-9a-fA-F]{24}$/)) {
    return helpers.message('"{{#label}}" must be a valid mongo id');
  }
  return value;
};

const createAddition = (data) => {
  const schema = Joi.object({
    groupId: Joi.string().custom(objectId).required(),
    default: Joi.boolean(),
    calories: Joi.string().required(),
    name: Joi.string().required(),
    price: Joi.number().required(),
  });
  return schema.validate(data);
};

module.exports = {
  createAddition,
};
