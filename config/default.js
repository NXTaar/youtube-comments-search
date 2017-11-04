const youtube = require('./youtube.json')
const auth = process.env.GOOGLE_API_KEY

if (typeof auth !== 'string') {
    throw new Error('No API key was provided. Please set it via GOOGLE_API_KEY envirement variable')
}
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
        collectionProperty: youtube.collectionProperty,
        comments: youtube.comments.fields,
        replies: youtube.replies.fields
    }
}