'use strict';
const sequenceGenerator = require('./seqGenerator');

let commentsWithReplies = sequenceGenerator.parsedItems
    .filter(item => item.apiType == 'thread' && item.replies > 0)
    .subscribe(getRepliesFromApi);

function getRepliesFromApi(item) {
    let {clientId, searchFrase, videoId} = item;
    sequenceGenerator.apiRequests.add({
        apiType:'replies',
        requestData: {parentId: item.commentId},
        clientInfo: {clientId, searchFrase, videoId}
    });
}