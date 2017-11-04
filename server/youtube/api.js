const config = require('config')
const mapResponse = require('./mapper')
const API = require('googleapis').youtube('v3')

const { comments, replies } = config.get('youtubeAPI')

const commentsAPI = API.commentThreads.list
const repliesAPI = API.comments.list

const writeToJSON = require('../output/json')

let mapper = mapResponse('comments')

commentsAPI({...comments, videoId: 'qBgbKJE9XiM'}, (err,res) => {
    writeToJSON({filename: 'response', target: mapper(res)})
})