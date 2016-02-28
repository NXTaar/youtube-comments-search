'use strict';
const sequenceGenerator = require('./seqGenerator');

let apiResponses = sequenceGenerator.apiResponses;

let throughGoingItems = apiResponses
    .filter(i => !i.err && i.apiResponse.items)
    .subscribe(i => sequenceGenerator.itemsToParse.add(i));

let itemsNextPageNeeded = apiResponses
    .filter(i => !i.err && i.apiResponse.items && i.apiResponse.nextPageToken)
    .map(nextPageRequestPreparations)
    .subscribe(requestNextPage);

let apiErros = apiResponses
    .filter(i => i.err)
    .subscribe(sequenceGenerator.errors.add);

function nextPageRequestPreparations(responseItem) {
    let pageToken   = responseItem.apiResponse.nextPageToken;
    let items       = responseItem.apiResponse.items;
    let clientId          = responseItem.clientInfo.clientId;
    let searchFrase = responseItem.clientInfo.searchFrase;
    let videoId = responseItem.clientInfo.videoId;
    let result = {
        apiType: responseItem.apiType,
        requestData: {pageToken},
        clientInfo: {clientId, searchFrase, videoId}
    }
    if (responseItem.apiType === 'thread') {
        result.requestData.videoId = items.reduce(cur => cur).snippet.videoId;
    }
    if (responseItem.apiType === 'replies') {
        result.requestData.parentId = items.reduce(cur => cur).snippet.parentId;
    }
    return result
}

function requestNextPage({apiType, requestData, clientInfo}) {
    return sequenceGenerator.apiRequests.add({apiType, requestData, clientInfo});
}