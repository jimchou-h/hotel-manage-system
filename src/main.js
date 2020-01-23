// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import store from './stores'
import router from './router'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/assets/css/index.css'
import '@/assets/js/index.js'

Vue.config.productionTip = false
Vue.use(ElementUI)



Vue.prototype.$Service = require('@/assets/service/service').default;
Vue.prototype.$Cache = require('@/assets/global/cache').default

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: {
    App
  },
  template: '<App/>'
})
