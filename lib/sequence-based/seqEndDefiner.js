'use strict';
const _ = require('lodash');
const sequenceGenerator = require('./seqGenerator');
const youtube = require('./youtube');

let registry = {};

let threads = sequenceGenerator.threadsToBeEndDefined.share();

let firstThreadItem = threads.filter(i => !(i.clientInfo.clientId in registry))
	                         .subscribe(initRegisryCellForClient);

threads.subscribe(addOverallRepliesCounterToRegistry);

let lastThreadItem = threads.filter(i => i.isLastThread)
	                        .subscribe(handleLastItemInThread);

let repliesResponses = sequenceGenerator.apiResponses.filter(i => i.apiType == 'replies');

repliesResponses.subscribe(addPresentReplyRequestCountToRegistry);

function initRegisryCellForClient(item) {
	registry[item.clientInfo.clientId] = {
		threadCount: 0,
		presentRepliesRequestCount: 0,
		overall: 0,
		noMoreThreads: false
	}
}

function handleLastItemInThread(item) {
	let registryCell = registry[item.clientInfo.clientId];
	let noMoreRepliesCondition = item.repliesCount == 0;

	registryCell.noMoreThreads = true;

	if (registryCell.overall == registryCell.presentRepliesRequestCount && noMoreRepliesCondition) {
		return handleOverallEnd(item);
	}

	if (registryCell.overall == 0) return handleOverallEnd(item);
}

function addPresentReplyRequestCountToRegistry(item) {
	let registryCell = registry[item.clientInfo.clientId];
	registryCell.presentRepliesRequestCount++;
	if (overallEndCheck(registryCell)) handleOverallEnd(item);
}

function overallEndCheck({overall, presentRepliesRequestCount, noMoreThreads}) {
	return (overall == presentRepliesRequestCount && noMoreThreads == true)
}

function addOverallRepliesCounterToRegistry(item) {
	registry[item.clientInfo.clientId].overall += item.repliesCount;
	registry[item.clientInfo.clientId].threadCount++;
}

function handleOverallEnd(item) {
	let { videoId, clientId, searchFrase } = item.clientInfo;
	let finalizer = { videoId, clientId, searchFrase, finishToken: true }
	delete registry[item.clientInfo.clientId];
	process.nextTick(() => { sequenceGenerator.parsedItems.add(finalizer) });
}