import Vue from 'vue'
import VueMaterial from 'vue-material'
import Vuex from 'vuex'

import App from './components/App.vue'

import 'vue-material/dist/vue-material.css'

Vue.use(Vuex)
Vue.use(VueMaterial)

import pulseMutations from '@modules/pulse'

const store = new Vuex.Store({
  state: {
    videoId: null,
    searchString: null,
    stream: null
  },
  mutations: {
    handleInput (state, {input, value}) {
      state[input] = value
    },
    ...pulseMutations
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