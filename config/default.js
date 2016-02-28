const commonApiRequestInformation = {
    auth: require('./apiKey'),
    maxResults: 100,
    part: "snippet",
    textFormat: "plainText"
}

module.exports = {
    database: 'mongodb://localhost/ycs',
    appPort: 3040,
    appUrl: "http://localhost",
    threadRequestSettings: Object.assign({
        order:  "relevance",
        fields: "nextPageToken," +
                "items/snippet/videoId," +
                "items/snippet/topLevelComment/snippet/textDisplay," +
                "items/snippet/topLevelComment/snippet/authorDisplayName," +
                "items/snippet/topLevelComment/snippet/authorChannelUrl," +
                "items/snippet/topLevelComment/snippet/publishedAt," +
                "items/snippet/topLevelComment/id," +
                "items/snippet/totalReplyCount"
    }, commonApiRequestInformation),

    commentsRequestSettings: Object.assign({
        fields: "nextPageToken," +
                "items/snippet/authorDisplayName," +
                "items/snippet/authorChannelUrl," +
                "items/snippet/textDisplay," +
                "items/snippet/publishedAt," +
                "items/snippet/parentId"
    }, commonApiRequestInformation)
}