const fs = require('fs')
const path = require('path')

const routesFolder = require('config').get('app.routesFolder')

let routes = fs.readdirSync(routesFolder, {encoding: 'utf8'})

module.exports = app => {
    routes.forEach(rp => {
        let routePath = path.resolve(routesFolder, rp)
        let route = require(routePath)
        app.use(route.routes())
           .use(route.allowedMethods());
    })
    return app
}