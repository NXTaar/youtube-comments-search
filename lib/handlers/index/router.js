'use strict';
const Router = require('koa-router');

let router = module.exports = new Router();

router.get('/', function* () {
    this.body = yield this.render('index');
})