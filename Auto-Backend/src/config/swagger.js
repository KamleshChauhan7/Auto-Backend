import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import path from "path";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "SeaNeB Auto API Documentation",
      version: "1.0.0",
      description: "API documentation for SeaNeB Auto Server. Switch servers in the dropdown below to test via Gateway or Direct port.",
    },
    servers: [
      {
        // Production Gateway
        url: "https://auto.seaneb.com/gateway/auto",
        description: "Production API Gateway"
      },
      {
        // Local Gateway (Port 9495) - For Add Vehicle
        url: "http://192.168.0.115:9495",
        description: "Local API Gateway (Port 9495)"
      },
      {
        // Local Direct Server (Port 8030) - For Verify RC / Development
        url: "http://localhost:8030/api/v1/auto",
        description: "Local Direct Server (Port 8030)"
      }
    ],
    components: {
      securitySchemes: {
        // JWT Auth for secured user routes
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
  },
  // Scans all documentation and route files
  apis: [
    "./src/api-doc/**/*.js",
    "./src/routes/**/*.js",
    "./src/controllers/**/*.js",
  ],
};

const swaggerSpec = swaggerJSDoc(options);

export { swaggerUi, swaggerSpec };