const express = require('express');
const Router = express.Router();
const productRoute = require('./product.route');
const authRoute = require('./auth.route');


Router.use('/Product', productRoute)
Router.use('/auth', authRoute)

module.exports = Router;