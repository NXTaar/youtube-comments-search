import Vue from 'vue'
import VueMaterial from 'vue-material'
import Vuex from 'vuex'

import App from './components/App.vue'

import 'vue-material/dist/vue-material.css'

Vue.use(Vuex)
Vue.use(VueMaterial)

const store = new Vuex.Store({
  state: {
    videoId: null,
    searchString: null
  },
  mutations: {
    handleInput (state, {input, value}) {
      state[input] = value
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