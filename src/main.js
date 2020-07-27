// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '../src/assets/css/reset.css'
import store from '@/store'
import filers from './filters/index'
import comComponents from './components/index'

Vue.use(ElementUI)

Vue.config.productionTip = false

// filters注册
for (let i in filers) {
  Vue.filter(i, filers[i])
}

// 全局组件注册
for (let i in comComponents) {
  Vue.component(i, comComponents[i])
}

Vue.prototype.$imgpre = 'http://localhost:3000'

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
