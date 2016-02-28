'use strict';
const Rx = require('rx');
const Output = require('../output');
const dateFormat = require('dateformat');
//let count = 0;
let sequenceGenerator = new Rx.Subject()

let apiErros = sequenceGenerator
    .filter(i => i.err)
    .subscribe((err) => {
		//todo create error logging module (possible with a service dispatcher);
		console.log('Error! See in logs'); //debug
		Output.writeToJson(`error Type-${err.apiType} Code-${err.err.code} Client-${err.clientId} Date-${dateFormat('dd-mm-yyyy-HH-MM-ss-ms')}`, err);
	});

let listsWithComments = sequenceGenerator
   .filter(i => !i.err && i.apiResponse.items)
   .subscribe((x) => {
	   //count++
	   //Output.writeToJson(`rep${count}`, x);
	   console.log('ok', new Date(), `количество наименований - ${x.apiResponse.items.length}`); //debug
   });

let listsNextPageNeeded = sequenceGenerator
	.filter(i => !i.err && i.apiResponse.items && i.apiResponse.nextPageToken)
	.map(nextRequestPreparations)
	.subscribe(({apiType, requestData, clientId}) => {
		let youtubeApi = require('./youtube');
		youtubeApi[apiType](requestData, clientId);
	})


exports.send = function (apiResponse) { sequenceGenerator.onNext(apiResponse) }
exports.error = function (error) { sequenceGenerator.onError(error) };



function nextRequestPreparations(responseItem) {
	let pageToken = responseItem.apiResponse.nextPageToken;
	let items = responseItem.apiResponse.items;
	let result = {
			apiType: responseItem.apiType,
			requestData: {pageToken},
			clientId: responseItem.clientId
		}
	if (responseItem.apiType === 'thread') {
		result.requestData.videoId = items.reduce(cur => cur).snippet.videoId;
	}
	if (responseItem.apiType === 'replies') {
		result.requestData.parentId = items.reduce(cur => cur).snippet.parentId;
	}
	return result
}
