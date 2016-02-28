'use strict';
const jsonfile = require('jsonfile');


exports.writeToJson = function (filename, object, options) {
    options = options || {};
    return new Promise((res, rej) => {
        jsonfile.writeFile(`./output/${filename}.json`, object, {spaces: 2}, function (err, data) {
            if (err) rej(err);
            if(data == null) res();
        })
    })
}