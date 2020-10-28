const orderRouter = require('express-promise-router')();
const OrderController = require('../controllers/OrderController');


/**
 * @swagger
 * tags:
 *   name: Orders
 *   description: Order management
 */
orderRouter.route('/')
    /**
     * @swagger
     * path:
     *  /orders:
     *    get:
     *      summary: get all orders
     *      tags: [Orders]
     *      responses:
     *        "200":
     *          description: all orders
     *          content:
     *            application/json:
     *              schema:
     *                $ref: '#/components/schemas/Order'
     */
    .get(OrderController.index)
    /**
     * @swagger
     * path:
     *   /orders:
     *     post:
     *       summary: create new order
     *       tags: [Orders]
     *       requestBody:
     *         required: true
     *         content:
     *          application/json:
     *            schema:
     *              $ref: '#/components/schemas/Order'
     *       responses:
     *         "201":
     *           description: new order created
     *           content:
     *             application/json:
     *               schema:
     *                 $ref: '#/components/schemas/Order'
     */
    .post(OrderController.add);

orderRouter.route('/:id')
    /**
     * @swagger
     * path:
     *   /orders/:id:
     *     put:
     *       summary: update existing order by id
     *       tags: [Orders]
     *       parameters:
     *        - in: path
     *          name: id
     *          schema:
     *            type: string
     *          required: true
     *          description: order id
     *       requestBody:
     *         required: true
     *         content:
     *          application/json:
     *            schema:
     *              $ref: '#/components/schemas/Order'
     *       responses:
     *         "200":
     *           description: order updated
     *           content:
     *             application/json:
     *               schema:
     *                 $ref: '#/components/schemas/Order'
     */
    .put(OrderController.update)
    /**
     * @swagger
     * path:
     *   /orders/:id:
     *     patch:
     *       summary: update status of order
     *       tags: [Orders]
     *       parameters:
     *        - in: path
     *          name: id
     *          schema:
     *            type: string
     *          required: true
     *          description: order id
     *       requestBody:
     *         required: true
     *         content:
     *          application/json:
     *            schema:
     *              status: string
     *       responses:
     *         "200":
     *           description: order updated
     *           content:
     *             application/json:
     *               schema:
     *                 $ref: '#/components/schemas/Order'
     */
    .patch(OrderController.updateStatus)
    /**
     * @swagger
     * path:
     *   /orders/:id:
     *     patch:
     *       summary: update order by id
     *       tags: [Orders]
     *       parameters:
     *        - in: path
     *          name: id
     *          schema:
     *            type: string
     *          required: true
     *          description: order id
     *       responses:
     *         "204":
     *           description: order deleted
     */
    .delete(OrderController.destroy);

module.exports = orderRouter;
