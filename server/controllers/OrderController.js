const Order = require('../models/Order');

module.exports = {
    // get all orders
    index: async (request, response, next) => {
        let startDate = new Date();
        startDate.setDate(startDate.getDate() - 1)
        const endDate = new Date();
        const orders = await Order.find({"createdAt": {$lte: new Date()}}).populate('products');
        response.status(200).json(orders);
    },
    add: async (request, response, next) => {
        const order = await Order.create({products: []});
        request.body.products.forEach((product) => order.products.push(product));
        await order.save();
        response.status(201).json(order);
        global.io.emit('updateOrders');
    },
    update: async (request, response, next) => {
        console.log('update order');
        const {id} = request.params;
        let order = await Order.findById(id);
        await order.updateOne(request.body);
        response.status(200).json(await Order.findById(id));
        global.io.emit('updateOrders');
    },
    updateStatus: async (request, response, next) => {
        console.log('update status from order');
        const {id} = request.params;
        let order = await Order.findById(id);
        await order.updateOne({status: request.body.status})
        response.status(200).json(await Order.findById(id));
        global.io.emit('updateOrders');
    },
    destroy: async (request, response, next) => {
        await Order.findByIdAndDelete(request.params.id);
        response.status(204).json();
        global.io.emit('updateOrders');
    },
}
