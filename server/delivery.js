const http = require('http');
const sockjs = require('sockjs');


const socket = sockjs.createServer({
    sockjs_url: 'http://cdn.jsdelivr.net/sockjs/1.0.1/sockjs.min.js'
})

let connections = {}

socket.on('connection', function (conn) {
    connections[conn.id] = conn
    conn.on('close', () => delete connections[conn.id])
    
});

const attachSocket = app => {
    let server = http.createServer(app.callback());
    socket.installHandlers(server, { prefix: '/pulse' });
    return server
}

const sendPackage = (connId, package) => {
    let connection = connections[connId]
}


module.exports = { attachSocket, sendPackage }