const Chai = require('chai');
const ChaiHttp = require('chai-http')
const Order = require('../models/Order');
const Product = require('../models/Product');
const app = require('../index');
const dotenv = require("dotenv");

Chai.should();
Chai.use(ChaiHttp);

dotenv.config();

describe('Order API', function () {
    // create products before all tests start so they can be added to the order
    before(async () => {
        console.log('tests start');
        await Order.deleteMany({}, () => {
        });
        for (let i = 1; i < 6; i++) {
            await Product.create({name: 'test product ' + i, unitPrice: i ^ 8 * 0.25});
        }
    });

    // delete all orders after each test
    afterEach(() => {
        console.log('test done');
        Order.deleteMany({}, () => {
        });
    })

    describe("POST /orders", () => {
        it('should create an order and return that order', function (done) {
            Product.find({}, (error, products) => {
                Chai.request(app).post('/orders')
                    .send({products: products})
                    .end((error, response) => {
                        response.should.have.status(201);
                        response.should.be.a('object');
                        response.body.should.include({status: "to be prepared"});
                        response.body.products.should.be.a('array').and.have.length(5);
                        response.body.should.satisfy((object) => {
                            return (Date.parse(object.createdAt) <= new Date) && (Date.parse(object.createdAt) > (new Date(new Date - 60000)))
                        });
                        done();
                    });
            });
        });
    });

    describe("GET /orders", () => {
        it('should return an array of orders with products', function (done) {
            Product.find({}, (error, products) => {
                const order = new Order({products: products});
                order.save((error, order) => {
                    Chai.request(app).get('/orders')
                        .send()
                        .end((error, response) => {
                            response.should.have.status(200);
                            response.body[0].should.have.property('status').to.be.eql(order.status);
                            response.body[0].should.have.property('products').has.to.be.a('array').that.has.length(5);
                            response.body[0].should.have.property('createdAt');
                            response.body[0].products[0].should.have.property('name');
                            response.body[0].products[0].should.have.property('createdAt');
                            response.body[0].products[0].should.have.property('unitPrice');
                            response.body[0].products[0].should.have.property('isActive');
                            done();
                        })
                })
            });
        });
    });

    describe("PUT /orders/:id", () => {
        it('should update an order by its id', function (done) {
            Product.find({}, (error, products) => {
                const order = new Order({products: products});
                order.save((error, order) => {
                    Chai.request(app).put('/orders/' + order.id)
                        .send({status: 'done'})
                        .end((error, response) => {
                            response.should.have.status(200);
                            response.body.should.have.property('status').to.be.eql("done");
                            response.body.should.have.property('products').has.to.be.a('array').that.has.length(5);
                            response.body.should.have.property('createdAt');
                            done();
                        })
                })
            });
        });
    });

    describe("PATCH /orders/:id", () => {
        it('should update the status of the order to done', function (done) {
            Product.find({}, (error, products) => {
                const order = new Order({products: products});
                order.save((error, order) => {
                    Chai.request(app).patch('/orders/' + order.id)
                        .send({status: 'done'})
                        .end((error, response) => {
                            response.should.have.status(200);
                            response.body.should.have.property('status').to.be.eql("done");
                            response.body.should.have.property('products').has.to.be.a('array').that.has.length(5);
                            response.body.should.have.property('createdAt');
                            done();
                        })
                })
            });
        });
        it('should update the status of the order to deleted', function (done) {
            Product.find({}, (error, products) => {
                const order = new Order({products: products});
                order.save((error, order) => {
                    Chai.request(app).patch('/orders/' + order.id)
                        .send({status: 'deleted'})
                        .end((error, response) => {
                            response.should.have.status(200);
                            response.body.should.have.property('status').to.be.eql("deleted");
                            response.body.should.have.property('products').has.to.be.a('array').that.has.length(5);
                            response.body.should.have.property('createdAt');
                            done();
                        })
                })
            });
        });
    });

    describe("DELETE /orders/:id", () => {
        it('should delete an order and return 204 success', function (done) {
            Product.find({}, (error, products) => {
                const order = new Order({products: products});
                order.save((error, order) => {
                    Chai.request(app)
                        .delete('/orders/' + order.id)
                        .send()
                        .end((error, response) => {
                            response.should.have.status(204);
                            done()
                        })
                })
            });
        });
    });
});
