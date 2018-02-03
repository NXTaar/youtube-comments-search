import request from 'superagent'
import SocketConnection from 'sockjs-client'

let stream = null

export default {
    async sendQuery({ commit, dispatch }, payload) {
        let { pulseId } = (await request.get('/search').query(payload)).body

        commit('PULSE_ID_SET', pulseId)

        dispatch('openSocketConnection', pulseId)
    },

    openSocketConnection({ commit }, pulseId) {
        if (stream !== null) {
            stream.emit('CLOSE_CONNECTION')
        }

        stream = new SocketConnection('pulse')

        stream.emit = (type, ...payload) => {
            let prepared = JSON.stringify({ type, payload })
            console.log('socket sending', type, ...payload)
            stream.send(prepared)
        }
        stream.onopen = function (dd) {
            stream.emit('HANDSHAKE', pulseId)
        };
        stream.onmessage = msg => {
            let { type, payload } = JSON.parse(msg.data)

            console.log('socket recieving', type, ...payload)

            commit(type, ...payload)
        }
    }
}