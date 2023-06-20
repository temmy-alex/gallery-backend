const routes = require('express').Router();
const AuthRoutes = require('./authentication');
const ImageRoutes = require('./image');

routes.use('/auths', AuthRoutes);
routes.use('/images', ImageRoutes);

module.exports = routes;