'use strict';
const memory = require('sizeof');
const co = require('co');

const sequenceGenerator = require('./seqGenerator');
const VideoCache = require('models/video-cache');

let cache = {};

// let itemsToCache = sequenceGenerator.parsedItems.filter(i => i.toBeCached);

let itemsToCache = sequenceGenerator.parsedItems;
itemsToCache.subscribe((item) => item.toBeCached = true);

let firstItemToCache = itemsToCache
                            .filter(i => !(i.clientId in cache))
                            .subscribe(registerClientToCache)

itemsToCache.subscribe(handleItemAdding);

let lastItemToCache = itemsToCache
                            .filter(i => i.finishToken)
                            .subscribe(handleLastItem);

function registerClientToCache(item) {
    cache[item.clientId] = [ [] ];
}

function handleItemAdding(item) {
    let cacheItem = cache[item.clientId];
    let index = cacheItem.length - 1
    let chunk = cacheItem[index];
    let check = dbReadyChunkCheck(chunk);
    if (!check) return chunk.push(item);
    cacheItem.push([item]);
    cacheItem.splice(index, 1);
    saveCachedItemsToDatabase(item, chunk);
}

function handleLastItem(item) {
    let cacheItem = cache[item.clientId];
    let lastChunk = cacheItem[cacheItem.length - 1];
    delete cache[item.clientId];
    saveCachedItemsToDatabase(item, lastChunk);
}

function saveCachedItemsToDatabase(item, chunk) {
    return co(function* () {
        let collection = clearCollectionFromPersonalisedData(chunk);
        let videoId = item.videoId;
        let cachedData = yield VideoCache.findOne({videoId});
        if (!cachedData) cachedData = new VideoCache({videoId});
        cachedData.parsedItems = cachedData.parsedItems.concat(collection);
        try {
            yield cachedData.save();
        }
        catch (err) {
            console.log(err); //debug
        }
    })
}

function clearCollectionFromPersonalisedData(collection) {
    return collection.map(i => {
        delete i.clientId;
        delete i.searchFrase;
        delete i.toBeCached;
        return i;
    });
}

function dbReadyChunkCheck(chunk) {
    return memory.sizeof(chunk) > 100000;
}