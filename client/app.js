import Vue from 'vue'
import store from './store'

import VueMaterial from 'vue-material'

Vue.use(VueMaterial)

const components = require.context('./components', true, /\.vue$/)

components.keys().forEach(path => {
  let componentName = path.match(/[^\/]*(?=\.vue$)/)[0]

  Vue.component(componentName, components(path).default)
})

new Vue({
  el: '#app',
  store,
  render: (h) => h('App')
})
