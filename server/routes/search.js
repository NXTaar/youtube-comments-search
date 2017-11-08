let router = require('koa-router')()
let uniqid = require('uniqid')


const { sendSearchResults } = require('../delivery')
const { getVideoId } = require('../youtube/api')
const drain = require('../drainer')


const searchCallback = ({clientId, searchFrase}) => results => {
    let found = results.filter(item => {
        let stringBeingSearched = item.text.toLowerCase()
        let stringToSearch      = searchFrase.toLowerCase()
        return stringBeingSearched.indexOf(stringToSearch) > -1
    })
    
    if (found.length === 0) return

    sendSearchResults(clientId, found)
}

router.get('/search', async (ctx, next) => {
    let clientId = uniqid()
    let { vId, q: searchFrase } = ctx.query

    let videoId = getVideoId(vId)
    
    if (videoId === null) {
        ctx.throw(404, 'Video not found')
    }

    let query = { videoId }

    drain({
        query,
        callback: searchCallback({clientId, searchFrase})
    })
    
    ctx.body = { clientId }
})


module.exports = router