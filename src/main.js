import Vue from 'vue'
import VueTextareaAutosize from 'vue-textarea-autosize'

import App from './App.vue'
import store from './store'

Vue.config.productionTip = false

Vue.use(VueTextareaAutosize)

new Vue({
  store,
  render: h => h(App),
}).$mount('#app')
