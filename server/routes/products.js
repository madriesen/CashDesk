const productRouter = require('express-promise-router')();
const ProductController = require('./../controllers/ProductController');


/**
 * @swagger
 * tags:
 *   name: Products
 *   description: product management
 */
productRouter.route('/')
    /**
     * @swagger
     * path:
     *  /products:
     *    get:
     *      summary: get all products
     *      tags: [Products]
     *      responses:
     *        "200":
     *          description: all products
     *          content:
     *            application/json:
     *              schema:
     *                $ref: '#/components/schemas/Product'
     */
    .get(ProductController.index)
    /**
     * @swagger
     * path:
     *   /products:
     *     post:
     *       summary: create new product
     *       tags: [Products]
     *       requestBody:
     *         required: true
     *         content:
     *          application/json:
     *            schema:
     *              $ref: '#/components/schemas/Product'
     *       responses:
     *         "201":
     *           description: new product created
     *           content:
     *             application/json:
     *               schema:
     *                 $ref: '#/components/schemas/Product'
     */
    .post(ProductController.add);

productRouter.route('/:id')
    /**
     * @swagger
     * path:
     *   /products/:id:
     *     put:
     *       summary: update existing product by id
     *       tags: [Products]
     *       parameters:
     *        - in: path
     *          name: id
     *          schema:
     *            type: string
     *          required: true
     *          description: product id
     *       requestBody:
     *         required: true
     *         content:
     *          application/json:
     *            schema:
     *              $ref: '#/components/schemas/Product'
     *       responses:
     *         "200":
     *           description: product updated
     *           content:
     *             application/json:
     *               schema:
     *                 $ref: '#/components/schemas/Product'
     */
    .put(ProductController.update)
    /**
     * @swagger
     * path:
     *   /products/:id:
     *     delete:
     *       summary: delete product by id
     *       tags: [Products]
     *       parameters:
     *        - in: path
     *          name: id
     *          schema:
     *            type: string
     *          required: true
     *          description: product id
     *       responses:
     *         "204":
     *           description: product deleted
     */
    .delete(ProductController.destroy);

module.exports = productRouter;
