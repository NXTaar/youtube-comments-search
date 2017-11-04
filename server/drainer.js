const youtubeAPI = require('./youtube/api')
const itemsField = require('config').get('mapping.collectionProperty') 

const drain = async (params) => {
    let {
        query, 
        callback = ()=>{}, 
        api = 'comments'
    } = params

    let response = await youtubeAPI[api](query)

    let { pageToken } = response
    
    if (response[itemsField].length === 0 && api === 'replies') {
        // console.log("Empty replies", params.comment)
        //todo надо что-то делать с пустыми реплаями (предположительно баг youtube)
    }
    if (response[itemsField].length > 0) {
        callback(response[itemsField], api)
    }
    
    if (pageToken) {
        let nextRequest = {
            query: { ...query, pageToken }, 
            callback, 
            api
        }
        drain(nextRequest)
    }
    
    if (api !== 'comments') return

    response[itemsField].forEach(item => {
        if (item.replies === 0) return
        let commentRequest = {
            query: { parentId: item.commentId }, 
            callback, 
            api: 'replies',
            comment: item
        }
        drain(commentRequest)
    })
}

module.exports = drain