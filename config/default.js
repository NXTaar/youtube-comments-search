const youtube = require('./youtube.json')
const auth = require('./apiKey.json')
const app = require('./app.json')

const common = {
    auth,
    ...youtube.common
}

const fieldsArray = fm =>
    Object.keys(fm)
          .map(f => fm[f])
          .join(',')

module.exports = {
    app,
    youtubeAPI: {
        comments: {
            ...common,
            ...youtube.comments,
            fields: fieldsArray(youtube.comments.fields)
        },
        replies: {
            ...common,
            ...youtube.replies,
            fields: fieldsArray(youtube.replies.fields)
        }
    },
    mapping: {
        collectionRegex: youtube.collectionRegex,
        comments: youtube.comments.fields,
        replies: youtube.replies.fields
    }
}