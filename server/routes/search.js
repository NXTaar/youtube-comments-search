let router = require('koa-router')()
let uniqid = require('uniqid')


let { sendPackage } = require('../delivery')



router.get('/search', async (ctx, next) => {
    let clientId = uniqid()
    let {query} = ctx
    ctx.body = { clientId }
    setTimeout(() => sendPackage(clientId, query), 100)
})


module.exports = router