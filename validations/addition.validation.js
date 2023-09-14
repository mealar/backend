const Joi = require("joi");

const createAddition = (data) => {
  const schema = Joi.object({
    calories: Joi.string().required(),
    name: Joi.string().required(),
    price: Joi.number().required(),
  });
  return schema.validate(data);
};

module.exports = {
  createAddition,
};
