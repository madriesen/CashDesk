const Product = require('../models/Product');

module.exports = {
    // get all products
    index: async (request, response, next) => {
        const products = await Product.find({});
        response.status(200).json(products);
    },
    // add new product
    add: async (request, response, next) => {
        console.log('request', request.body);
        const newProduct = await new Product(request.body).save();
        response.status(201).json(newProduct);
    },
    // update existing product by ID
    update: async (request, response, next) => {
        await Product.findById(request.params.id).updateOne(request.body);
        response.status(200).json(await Product.findById(request.params.id));
    },
    // delete product by ID
    destroy: async (request, response, next) => {
        await Product.findByIdAndDelete(request.params.id);
        response.status(204).json();
    }
}
