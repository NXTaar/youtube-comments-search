const config = require('config')
const mapResponse = require('./mapper')
const API = require('googleapis').youtube('v3')

const { comments, replies } = config.get('youtubeAPI')

const APIRequest = ({api, mapper, static}) => query => {
    return new Promise((res, rej) => {
        api({ ...static, ...query }, (err, response) => {
            if (err) return rej(err)
            res(mapper(response))
        })
    })
}

exports.comments = APIRequest({
    api: API.commentThreads.list,
    mapper: mapResponse('comments'),
    static: comments
})

exports.replies = APIRequest({
    api: API.comments.list,
    mapper: mapResponse('replies'),
    static: replies
})