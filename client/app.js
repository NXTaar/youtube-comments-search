import Vue from 'vue'
import VueMaterial from 'vue-material'
import Vuex from 'vuex'

import App from './components/App.vue'

import 'vue-material/dist/vue-material.css'

Vue.use(Vuex)
Vue.use(VueMaterial)


import request from "superagent";
import { encodeGET } from "@utils/query";
import { openConnection } from "@modules/pulse";

import Search from './components/Search.vue'
import Results from './components/Results.vue'
import Comment from './components/Comment.vue'


Vue.component('search', Search)
Vue.component('results', Results)
Vue.component('comment', Comment)

const store = new Vuex.Store({
  state: {
    videoId: null,
    searchString: null,
    stream: null,
    comments: [],
    replies: {}
  },
  mutations: {
    handleInput(state, { input, value }) {
      state[input] = value
    },
    setNewConnection(state, stream) {
      state.stream = stream
    },
    packageArrived(state, newComments) {
      state.comments = [
        ...state.comments,
        ...newComments
      ]
    }
  },
  actions: {
    SEARCH_RESULTS({ commit }, pkg) {
      commit('packageArrived', pkg)
    },
    async SEND_SEARCH_REQUEST(store) {
      let { commit, state } = store
      let { videoId, searchString } = state;

      let validation = {
        [videoId.length === 0]: "videoId",
        [searchString.length === 0 || searchString.length < 3]: "searchString"
      };

      if (typeof validation[true] === "string") return;

      let query = encodeGET({ q: searchString, vId: videoId });

      let searchRequest = { body: {} };

      try {
        searchRequest = await request(`search?${query}`);
      } catch (err) {
        console.error(err.response.text);
      }

      if (searchRequest.body.clientId) {
        openConnection({
          clientId: searchRequest.body.clientId,
          store
        });
      }
    }
  }
})

Vue.material.registerTheme('default', {
  primary: {
    color: 'red',
    hue: 'A400'
  },
  accent: 'red',
  warn: 'blue',
  background: 'white'
})

new Vue({
  el: '#app',
  store,
  render: h => h(App)
})