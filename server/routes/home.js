const homeRouter = require('express-promise-router')();
const { get } = require('mongoose');
const HomeController = require('./../controllers/HomeController');


homeRouter.route('/shutdown').get(HomeController.shutdown);

homeRouter.route('/update').get(HomeController.update);

module.exports = homeRouter;