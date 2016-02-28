'use strict';
const config = require('config');

const Youtube = require('googleapis').youtube('v3');

const threads = Youtube.commentThreads.list;
let threadRequest  = config.get('threadRequestSettings');

const replies = Youtube.comments.list;
let repliesRequest = config.get('commentsRequestSettings');

const sequenceGenerator = require('./seqGenerator');

let videoId = '0t3enfZIhjQ';
let parentId = "z12qjfao0vnizpem4220tpehcnbuin3uy";

function apiRequest(api, requestConfig) {
	let apiType;
	if (api === threads) apiType = 'thread';
	if (api === replies) apiType = 'replies';
    return function (query, clientId) {
        api(Object.assign(requestConfig, query), function (err, apiResponse) {
            if (err) return sequenceGenerator.send({apiType, err, clientId});
            sequenceGenerator.send({apiType, apiResponse, clientId});
        })
    }
}

exports.thread = apiRequest(threads, threadRequest);
exports.replies = apiRequest(replies, repliesRequest);

exports.thread({videoId: 32235}, 123435);

 //exports.replies({parentId}, 32423);
