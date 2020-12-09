const Chai = require('chai');
const ChaiHttp = require('chai-http')
const Product = require('../models/Product');
const app = require('../index');
const dotenv = require("dotenv");

Chai.should();
Chai.use(ChaiHttp);

dotenv.config();

describe('Product API', function () {
    before(() => {
        Product.deleteMany({}, () => {
        });
    });

    afterEach(() => {
        Product.deleteMany({}, () => {
        });
    })

    describe("POST /products", () => {
        it("should add a product to the database", (done) => {
            Chai.request(app).post('/products')
                .send({ name: "test product", unitPrice: 11.4 })
                .end((err, response) => {
                    response.should.have.status(201);
                    response.should.be.a('object');
                    response.body.should.include({ name: "test product" });
                    response.body.should.include({ unitPrice: 11.4 });
                    response.body.should.include({ isActive: true });
                    response.body.should.satisfy((object) => {
                        return (Date.parse(object.createdAt) <= new Date) && (Date.parse(object.createdAt) > (new Date(new Date - 60000)))
                    });
                    done()
                })
        })
    });

    describe("GET /products", () => {
        it("should get an array of products", (done) => {
            let product = new Product({ name: 'test product', unitPrice: 11.4 });
            product.save((error, response) => {
                Chai.request(app).get('/products').send()
                    .end((err, response) => {
                        response.should.have.status(200);
                        response.body.should.be.a('array').to.have.length(1);
                        response.body[0].should.have.property('name');
                        response.body[0].should.have.property('isActive');
                        response.body[0].should.have.property('unitPrice');
                        response.body[0].should.have.property('createdAt');
                        done()
                    });
            });
        })
    });

    describe("PUT /products/:id", () => {
        it('should update a product and return the product', function (done) {
            let product = new Product({ name: 'test product', unitPrice: 11.4 });
            product.save((error, product) => {
                Chai.request(app)
                    .put('/products/' + product._id)
                    .send({ name: "broodje", unitPrice: 12.0 })
                    .end((error, response) => {
                        response.should.have.status(200);
                        response.body.should.be.a('object');
                        response.body.should.have.property('name');
                        response.body.should.have.property('isActive');
                        response.body.should.have.property('unitPrice');
                        response.body.should.have.property('createdAt');
                        done()
                    })
            })
        });
    });

    describe("DELETE /products/:id", () => {
        it('should delete a product and return 204 success', function (done) {
            let product = new Product({ name: 'test product', unitPrice: 11.4 });
            product.save((error, product) => {
                Chai.request(app)
                    .delete('/products/' + product._id)
                    .send()
                    .end((error, response) => {
                        response.should.have.status(204);
                        done()
                    })
            })
        });
    });
});
