'use strict';
const Router = require('koa-router');
const results = require('./results');

let router = module.exports = new Router();

router.post('/results', results.post);