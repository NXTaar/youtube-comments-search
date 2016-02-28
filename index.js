'use strict';
const Rx = require('rx');
const Output = require('./output');
const co = require('co');

//todo использовать ETags на странице API для кэширования запросов
const Youtube = require('googleapis').youtube;

const config = require('config');

function keySignedAPIRequest(obj) {
    obj.auth = config.get('APIkey');
    return obj;
}


let array = [1,2,3,4,5,6,7];
setTimeout(() => { array.push(4393)}, 3000);
var source = Rx.Observable.create((observer) => {
    while (true) {
        let givenValue = array.shift();
        if (givenValue) observer.onNext(givenValue);
    }
});

var subscription = source.subscribe((x) => { console.log(x) });

