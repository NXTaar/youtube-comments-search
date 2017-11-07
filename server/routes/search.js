let router = require('koa-router')()

let {connections} = require('../delivery')

router.get('/search', async (ctx, next) => {
    ctx.body = "ok"
})


module.exports = router