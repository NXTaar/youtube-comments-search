import SocketConnection from 'sockjs-client'

const openConnection = state => {
    state.stream = state.stream || new SocketConnection('pulse')
}

const mutations = {
    openConnection
}

export default mutations