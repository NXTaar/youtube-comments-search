import SocketConnection from 'sockjs-client'

export const openConnection = ({store, clientId}) => {
    let stream = store.state.stream

    if (stream !== null) {
        stream.emit('CLOSE_CONNECTION')
    }

    stream = new SocketConnection('pulse')

    stream.emit = (type, ...payload) => {
        let prepared = JSON.stringify({type, payload})
        console.log('socket sending', type, ...payload)
        stream.send(prepared)
    }
    stream.onopen = function(dd) {
        stream.emit('HANDSHAKE', clientId)
    };
    stream.onmessage = msg => {
        let {type, payload} = JSON.parse(msg.data)

        console.log('socket recieving', type, ...payload)

        store.dispatch(type, ...payload)
    }
    store.commit('setNewConnection', stream)
}
