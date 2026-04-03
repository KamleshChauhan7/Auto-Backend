import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

export const setupSwagger = (app) => {
  // Base Configuration for Auto Server
  const baseDefinition = {
    openapi: "3.0.0",
    info: {
      version: "1.0.0",
      description: "API documentation for SeaNeB Auto Server.",
    },
    servers: [
      {
        url: "http://192.168.0.156:9495",
        description: "Remote API Gateway (Port 9495)",
      },
      // {
      //   url: "http://192.168.0.107:8030",
      //   description: "Remote Server (Port 8030)",
      // },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
        ProductKey: {
          type: "apiKey",
          in: "header",
          name: "x-product-key",
        },
      },
    },
    // Applying BOTH globally to all endpoints
    security: [
      {
        bearerAuth: [],
        ProductKey: [],
      },
    ],
  };

  // Generate Web Spec 
  const webSpec = swaggerJSDoc({
    definition: {
      ...baseDefinition,
      info: {
        ...baseDefinition.info,
        title: "SeaNeB Auto Web API Documentation",
      },
    },
    apis: [
      "./src/api-doc/web-doc/**/*.js",
    ],
  });

  // Generate Mobile Spec 
  const mobileSpec = swaggerJSDoc({
    definition: {
      ...baseDefinition,
      info: {
        ...baseDefinition.info,
        title: "SeaNeB Auto Mobile API Documentation",
      },
    },
    apis: [
      "./src/api-doc/mobile-doc/**/*.js",
    ],
  });

  // Admin Spec
  const adminSpec = swaggerJSDoc({
    definition: {
      ...baseDefinition,
      info: {
        ...baseDefinition.info,
        title: "SeaNeB Auto Admin API Documentation",
      },
    },
    apis: [
      "./src/api-doc/admin-doc/**/*.js",
    ],
  });


  app.get("/swagger-web.json", (req, res) => res.json(webSpec));
  app.get("/swagger-mobile.json", (req, res) => res.json(mobileSpec));
  app.get("/swagger-admin.json",(req,res)=> res.json(adminSpec));

  app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(null, {
      explorer: true,
      swaggerOptions: {
        urls: [
          { url: "/swagger-web.json", name: "Auto Web APIs" },
          { url: "/swagger-mobile.json", name: "Auto Mobile APIs" },
          { url: "/swagger-admin.json",name:"Auto Admin API"}
        ],
        persistAuthorization: true,
      },
      customCss: ".swagger-ui .info a { display: none !important; } .swagger-ui .info .url { display: none !important; }",
    })
  );
};