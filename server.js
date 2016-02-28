const koa = require('koa');

const bodyParser = require('koa-bodyparser');
const logger = require('koa-logger');
const config = require("config");
const staticFiles = require('koa-static');

const app = module.exports = koa();

app.use(logger());
app.use(bodyParser());

require('modules/template')(app);

require('modules/routes')(app);

app.use(staticFiles(__dirname + '/_dist'), { maxage: 1000 * 365 * 24 * 60 * 60});

app.listen(config.get('appPort'));
console.log(`Server started, listening on port: ${config.get('appPort')}`);