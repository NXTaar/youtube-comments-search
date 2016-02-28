'use strict';
const sequenceGenerator = require('./seqGenerator');

//mark скорее всего вынести это в конфиг
const limit = 100;
let timeoutCutoff = 1;
let repliesInChainCounter = 0;
let chain = [];

setInterval(releaseByTimeout, 1000);

function getRepliesFromApi(item) {
    let id = item.clientId;
    let searchFrase = item.searchFrase;
    sequenceGenerator.apiRequests.add({
        apiType:'replies',
        requestData: {parentId: item.commentId},
        clientInfo: {id, searchFrase}
    });
}

function chainReplies(item) {
    refreshTimeoutCutoff();
    repliesInChainCounter += item.replies;
    chain.push(item);
    if (repliesInChainCounter >= limit) releaseChain('chainCounter');
}

function releaseByTimeout () {
    if (timeoutCutoff === 0) {
        refreshTimeoutCutoff();
        if (chain.length > 0) releaseChain('timeout');
    }
    timeoutCutoff--;
}
function refreshTimeoutCutoff() {
    timeoutCutoff = 1;
}

function releaseChain(releasedBy) {
    repliesInChainCounter = 0;
    sequenceGenerator.chainedReplies.add({releasedBy, repliesChain:chain});
    chain = [];
}
