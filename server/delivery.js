const http = require('http');
const sockjs = require('sockjs');


const socket = sockjs.createServer({
    sockjs_url: 'http://cdn.jsdelivr.net/sockjs/1.0.1/sockjs.min.js'
})

let connections = {}

let currentMoment = () => new Date().toISOString()


const initDataHandlers = conn =>({
    CLOSE_CONNECTION() {
        conn.end()
    },
    HANDSHAKE(clientId) {
        connections[clientId] = conn
        conn.cid = clientId
        console.log(`${currentMoment()} - connection ${conn.id} is linked to clientID ${conn.cid}`)
    }
})


socket.on('connection', function (conn) {
    console.log(`${currentMoment()} - connection ${conn.id} is open`)
    let actions = initDataHandlers(conn)

    conn.deliver = (type, ...payload) => {
        let prepared = JSON.stringify({type, payload})
        console.log(`${currentMoment()} - delivering ${type} package for clientID ${conn.cid} via connection ${conn.id}`)
        conn.write(prepared)
    }

    conn.on('data', (data) => {
        let {type, payload} = JSON.parse(data)

        let action = actions[type]

        if (typeof action !== 'function') return

        console.log(`${currentMoment()} - handling action ${type} for connection ${conn.id}`)
        action(...payload)
    })
    conn.on('close', () => {
        console.log(`${currentMoment()} - deleting connection ${conn.id} linked to clientID ${conn.cid}`)
        delete connections[conn.cid]
    })
});

const linkClient = (clientId, conn) => {
    connections[clientId] = conn
}

const attachSocket = app => {
    let server = http.createServer(app.callback());
    socket.installHandlers(server, { prefix: '/pulse' });
    return server
}

const sendSearchResults = (clientId, package) => {
    let connection = connections[clientId]
    connection.deliver('SEARCH_RESULTS', package)
}


module.exports = { attachSocket, sendSearchResults }