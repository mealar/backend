const swaggerJsdoc = require("swagger-jsdoc");

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Mealer Platform",
      version: "1.0.0",
      description:
        "This is an API documentation made with Swagger to test endpoints functionality",
    },
    servers: [
      {
        url: `http://localhost:${process.env.PORT_API}`,
      },
    ],
  },
  apis: ["./utils/swagger/templates/**/*.js"],
};

const specs = swaggerJsdoc(swaggerOptions);

module.exports = specs;
