const Joi = require("joi");
const httpStatus = require("http-status");
const pick = require("./pick");

const validate = (schema) => async (req, res, next) => {
  const validSchema = pick(schema, ["params", "query", "body", "files"]);
  const object = pick(req, Object.keys(validSchema));

  try {
    const { value, error } = await Joi.compile(validSchema)
      .prefs({ errors: { label: "key" }, abortEarly: false })
      .validateAsync(object);

    if (error) {
      let message = "";
      const errorObject = {};
      error.details.forEach((detail) => {
        const key = detail.path[1];
        const caution = detail.message.replace(/"/g, "");
        errorObject[key] = caution;
        message += `${caution} `;
      });
      if (message === "") message = "Validation failed";
      return res
        .status(httpStatus.BAD_REQUEST)
        .jsend.error({ data: errorObject, message });
    }
    Object.assign(req, value);
    return next();
  } catch (err) {
    let message = "";
    const errorObject = {};
    if (err.details) {
      err.details.forEach((detail) => {
        const key = detail.path[1];
        const caution = detail.message.replace(/"/g, "");
        errorObject[key] = caution;
        if (detail.path[0] === "params") message += `${caution} `;
      });
      if (message === "") message = "Validation failed";
    }

    return res.status(httpStatus.BAD_REQUEST).send({
      data: errorObject,
      message: message.length > 0 ? message : "Uncaught ValidationError",
    });
  }
};

module.exports = validate;
