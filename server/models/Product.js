const mongoose = require('mongoose');


/**
 * @swagger
 *  components:
 *    schemas:
 *      Product:
 *        type: object
 *        required:
 *          - name
 *          - unitPrice
 *        properties:
 *          name:
 *            type: string
 *          unitPrice:
 *            type: number
 *          isActive:
 *            type: boolean
 *          createdAt:
 *            type: Date
 *        example:
 *           name: test product 1
 *           unitPrice: 11.4
 *           isActive: true
 *           createdAt: "2020-10-25T14:07:39.706Z"
 */


const ProductSchema = mongoose.Schema({
    name: {type: String, required: true},
    unitPrice: {type: Number, required: true},
    isActive: {type: Boolean, default: true},
}, {timestamps: true})

module.exports = mongoose.model('Product', ProductSchema)
