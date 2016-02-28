'use strict';
const koaNunjucks = require('koa-nunjucks-2');

const handlerTemplates = require('./handlersList').templates();

const templateRender = koaNunjucks({
    ext: 'njk',
    path: handlerTemplates.concat('lib/templates'),
    nunjucksConfig: {
        autoescape: true
    }
});

module.exports = function (app) {
    app.context.render = templateRender;
};