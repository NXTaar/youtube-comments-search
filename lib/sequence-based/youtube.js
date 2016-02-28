'use strict';
const config = require('config');

const Youtube = require('googleapis').youtube('v3');

const threads = Youtube.commentThreads.list;
let threadRequest  = config.get('threadRequestSettings');

const replies = Youtube.comments.list;
let repliesRequest = config.get('commentsRequestSettings');

const sequenceGenerator = require('./seqGenerator');

sequenceGenerator.apiRequests.subscribe(provideRequestToAPI);

const api = module.exports = {
    thread: apiRequest(threads, threadRequest),
    replies: apiRequest(replies, repliesRequest)
};

function apiRequest(api, requestConfig) {
    let apiType;
    if (api === threads) apiType = 'thread';
    if (api === replies) apiType = 'replies';
    return function (query, clientInfo) {
        // console.time(`Api request - ${apiType}: `);
        api(Object.assign(requestConfig, query), function (err, apiResponse) {
            if (err) return sequenceGenerator.apiResponses.add({apiType, err, clientInfo});
            // console.timeEnd(`Api request - ${apiType}: `);
            console.log(`${apiType} response arrival - ${new Date().toISOString()}`);
            sequenceGenerator.apiResponses.add({apiType, apiResponse, clientInfo});
        })
    }
}

function provideRequestToAPI({apiType, requestData, clientInfo}) {
    return api[apiType](requestData, clientInfo);
}