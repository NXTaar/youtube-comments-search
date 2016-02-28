'use strict';
const sequenceGenerator = require('./seqGenerator');

let searchResults = sequenceGenerator.parsedItems
    .filter(matchingSearchFrase)
    .subscribe();

function matchingSearchFrase(item) {
    if (item.finishToken) return true;
    let stringBeingSearched = item.text.toLowerCase();
    let stringToSearch      = item.searchFrase.toLowerCase();
    return stringBeingSearched.indexOf(stringToSearch) > -1;
}