'use strict';
const sequenceGenerator = require('./seqGenerator');

let repliesToParse = sequenceGenerator.itemsToParse
    .filter(item => item.apiType === 'replies')
    .map(repliesParser)
    .subscribe(pushParsedToSequences);

let threadToParse = sequenceGenerator.itemsToParse
    .filter(item => item.apiType === 'thread')
    .map(threadParser)
    .subscribe(pushParsedToSequences);

function pushParsedToSequences(item) {
    if (item.apiType == 'thread') pushThreadToEndDefiner(item);
    item.toSequence.forEach(sequenceGenerator.parsedItems.add);
}

function pushThreadToEndDefiner(thread) {
    let {repliesCount, clientInfo, isLastThread} = thread;
    sequenceGenerator.threadsToBeEndDefined.add({repliesCount, clientInfo, isLastThread})
}

function threadParser(thread) {
    let repliesCount = thread.apiResponse.items.filter(item => item.snippet.totalReplyCount > 0).length;
    return {
        apiType: thread.apiType,
        clientInfo: thread.clientInfo,
        repliesCount,
        isLastThread: !Boolean(thread.apiResponse.nextPageToken),
        toSequence: thread.apiResponse.items
            .filter(i => i.snippet.topLevelComment.snippet.textDisplay.length > 0)
            .map(comment => {
                let {authorDisplayName, authorChannelUrl, textDisplay, publishedAt} = comment.snippet.topLevelComment.snippet;
                return {
                    apiType: thread.apiType,
                    clientId: thread.clientInfo.clientId,
                    searchFrase: thread.clientInfo.searchFrase,
                    videoId:  comment.snippet.videoId,
                    commentId: comment.snippet.topLevelComment.id,
                    replies:  comment.snippet.totalReplyCount,
                    author:   authorDisplayName,
                    authorsChannel: authorChannelUrl,
                    text: textDisplay,
                    publishedAt
                }
        })
    }
}

function repliesParser(comment) {
    return {
        apiType: comment.apiType,
        toSequence: comment.apiResponse.items
            .filter(i => i.snippet.textDisplay.length > 0)
            .map(reply=> {
                return {
                    apiType: comment.apiType,
                    clientId: comment.clientInfo.clientId,
                    videoId: comment.clientInfo.videoId,
                    searchFrase: comment.clientInfo.searchFrase,
                    parentId: reply.snippet.parentId,
                    author: reply.snippet.authorDisplayName,
                    authorsChannel: reply.snippet.authorChannelUrl,
                    text: reply.snippet.textDisplay,
                    publishedAt: reply.snippet.publishedAt
                }
            })
    }
}