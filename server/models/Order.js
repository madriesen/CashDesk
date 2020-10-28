const mongoose = require('mongoose');

/**
 * @swagger
 *  components:
 *    schemas:
 *      Order:
 *        type: object
 *        required:
 *          - products
 *        properties:
 *          createdAt:
 *            type: date
 *          products:
 *            type: array
 *            items:
 *              $ref: '#/components/schemas/Product'
 *          status:
 *            type: string
 *            enum: ['to be prepared', 'done', 'deleted']
 *        example:
 *           createdAt: "2020-10-25T14:07:39.706Z"
 *           status: "to be prepared"
 *           products: [123ABC123, 456CDE345]
 */
const OrderSchema = mongoose.Schema({
    // createdAt: {type: Date, default: new Date()},
    products: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
    }],
    status: {
        type: String,
        enum: ['to be prepared', 'done', 'deleted'],
        default: 'to be prepared'
    },
}, {timestamps: true})

module.exports = mongoose.model('Order', OrderSchema)
