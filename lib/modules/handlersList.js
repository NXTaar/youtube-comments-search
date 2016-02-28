'use strict';
const fs = require('fs');
const path = require('path');

const handlersPath = path.join(process.cwd(), 'lib/handlers');

let handlers = fs.readdirSync(handlersPath);

exports.routes = function () {
    return handlers.map(i => path.join(handlersPath, i, 'router'));
}

exports.templates = function () {
    return handlers.map(i => path.join(handlersPath, i, 'templates'));
}