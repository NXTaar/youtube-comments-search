const path = require('path')

const Koa = require('koa')
const Router = require('koa-router')
const bodyParser = require('koa-bodyparser')
const queryParser = require('koa-qs')

const webpackMiddleware = require('koa-webpack')

const config = require('config')

const webpackConfig = require('../webpack.config')

const port = config.get('app.port')

const app = new Koa();
const router = new Router();

app.use(bodyParser())
queryParser(app)

app.use(webpackMiddleware({
    config: webpackConfig
}));

router.get('/search', async ctx => {
    ctx.body = 'Search request was accepted!'
})


app.use(router.routes())
   .use(router.allowedMethods());

app.listen(port, () => console.log(`Server is running on port: ${port}`) );