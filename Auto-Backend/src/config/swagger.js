import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import path from "path";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "SeaNeB Auto API Documentation",
      version: "1.0.0",
      description: "API documentation for SeaNeB Auto Server",
    },
    servers: [
      {
        url: "http://localhost:3000/api/v1",
        description: "Local server",
      },
    ],
  },

  apis: [
    path.join(process.cwd(), "src/api-doc/**/*.js"),
  ],
};

const swaggerSpec = swaggerJSDoc(options);

export { swaggerUi, swaggerSpec };