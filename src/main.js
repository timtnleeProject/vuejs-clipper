import Vue from 'vue'
import App from './App.vue'
import router from './router'
import clipper from 'vuejs-clipper'
import './assets/darcula.css'
import VueHighlightJS from 'vue-highlightjs'
// Tell Vue.js to use vue-highlightjs
Vue.use(VueHighlightJS)
Vue.use(clipper)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')