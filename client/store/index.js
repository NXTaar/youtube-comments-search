import Vuex from 'vuex'
import Vue from 'vue'

import rootActions from './actions'
import rootMutations from './mutations'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        pulseId: null,
        comments: [],
        replies: {}
    },
    actions: {
        ...rootActions
    },
    mutations: {
        ...rootMutations
    }
})
