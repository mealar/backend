const Joi = require("joi");
const objectId = (value, helpers) => {
  if (!value.match(/^[0-9a-fA-F]{24}$/)) {
    return helpers.message('"{{#label}}" must be a valid mongo id');
  }
  return value;
};
const createAdditionGroup = {
  body: Joi.object({
    menuId: Joi.string().custom(objectId),
    dishId: Joi.string().custom(objectId),
    createdBy: Joi.string().required(),
    name: Joi.string().required(),
    isRequired: Joi.boolean(),
  }).xor("menuId", "dishId"),
};

module.exports = {
  createAdditionGroup,
};
