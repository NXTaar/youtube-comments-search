let router = require('koa-router')()
let uniqid = require('uniqid')

const { sendSearchResults } = require('../delivery')
const { getVideoId } = require('../youtube/api')
const drain = require('../drainer')

const searchCallback = ({ clientId, searchFrase }) => ({
    items,
    api,
    parentId
}) => {
    let found = items.filter(item => {
        let stringBeingSearched = item.text.toLowerCase()
        let stringToSearch = searchFrase.toLowerCase()
        return stringBeingSearched.indexOf(stringToSearch) > -1
    })

    if (found.length === 0) return

    sendSearchResults(clientId, {
        items: found,
        type: api,
        ...(api === 'replies' && { parentId })
    })
}

router.get('/search', async (ctx, next) => {
    let clientId = uniqid()
    let { link, phrase: searchFrase } = ctx.query

    let videoId = getVideoId(link)

    if (videoId === null) {
        ctx.throw(404, 'Video not found')
    }

    let query = { videoId }

    drain({
        query,
        callback: searchCallback({ clientId, searchFrase })
    })

    ctx.body = { pulseId: clientId }
})

module.exports = router
