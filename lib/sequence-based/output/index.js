'use strict';
const _ = require('lodash');
const jsonfile = require('jsonfile');
const seqGenerator = require('../seqGenerator');
const dateFormat = require('dateformat');

seqGenerator.outputToJSON.subscribe(object => {
    writeToJson({filename: _.uniqueId(), object});
});

//todo подумать как можно сделать эту функцию лаконичнее (не забыть про вызов в error.js)
function writeToJson ({filename, object, options}) {
    options = options || {};
    let path = `./modules/output/${filename}.json`;
    return new Promise((res, rej) => {
        jsonfile.writeFile(path, object, {spaces: 2}, function (err, data) {
            if (err) rej(err);
            if(data == null) res(console.log(`${filename}.json written`));
        })
    }).catch(err => console.log(err));
}