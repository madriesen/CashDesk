const docRouter = require('express-promise-router')();
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

// Swagger set up
const options = {
    swaggerDefinition: {
        openapi: "3.0.0",
        info: {
            title: "Kassasysteem",
            version: "1.0.0",
            description:
                "Kassasysteem voor kassa en bestellingen",
            license: {
                name: "MIT",
            },
            contact: {
                name: "Martijn Driesen",
                email: "Info@martijndriesen.me"
            }
        },
    },
    apis: [
        "./models/Product.js",
        "./models/Order.js",
        "./routes/Products.js",
        "./routes/orders.js",
        "./routes/error.js",
        "./routes/docs.js"
    ]
};
const specs = swaggerJsdoc(options);

/**
 * @swagger
 * tags:
 *   name: Documentation
 */

/**
 * @swagger
 * path:
 *  /docs:
 *    get:
 *      summary: documentation
 *      tags: [Documentation]
 */
docRouter.use("/", swaggerUi.serve);
docRouter.get(
    "/",
    swaggerUi.setup(specs, {
        explorer: true
    })
);

module.exports = docRouter;
