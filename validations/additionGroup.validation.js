const Joi = require("joi");

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
