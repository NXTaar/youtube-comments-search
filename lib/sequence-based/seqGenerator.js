'use strict';
const Rx = require('rx');

const sequences = [
    'parsedItems',
    'itemsToParse',
    'apiResponses',
    'errors',
    'apiRequests',
    'outputToJSON',
    'chainedReplies',
    'service_counter',
    'threadsToBeEndDefined'
];

sequences.forEach(item => {
    exports[item] = new Rx.Subject();
    exports[item].add = function (x)  { exports[item].onNext(x) }
})