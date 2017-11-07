const path = require('path')

const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const queryParser = require('koa-qs')

const webpackMiddleware = require('koa-webpack')

const { attachSocket } = require('./delivery')
const attachRoutes = require('./router')

const config = require('config')

const webpackConfig = require('../webpack.config')

const port = config.get('app.port')

let app = new Koa();

app.use(bodyParser())
queryParser(app)

app.use(webpackMiddleware({
    config: webpackConfig
}));

app = attachRoutes(app)
app = attachSocket(app)

app.listen(port, () => console.log(`Server is running on port: ${port}`));