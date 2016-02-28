'use strict';
const lazyLoadRouter = require('./lazyLoadRouter');
const handlersList = require('../handlersList');

module.exports = function (app) {
    handlersList.routes().forEach(route => {
        app.use(lazyLoadRouter(route));
    })
};

