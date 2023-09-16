const Joi = require("joi");
const objectId = (value, helpers) => {
  if (!value.match(/^[0-9a-fA-F]{24}$/)) {
    return helpers.message('"{{#label}}" must be a valid mongo id');
  }
  return value;
};
const createAdditionGroup = (data) => {
  const schema = Joi.object({
    createdBy: Joi.string().required(),
    name: Joi.string().required(),
  });
  return schema.validate(data);
};

module.exports = {
  createAdditionGroup,
};
