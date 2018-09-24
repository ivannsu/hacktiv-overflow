import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import FBSignInButton from 'vue-facebook-signin-button'

Vue.config.productionTip = false

Vue.use(FBSignInButton)
Vue.prototype.$baseurl = 'http://localhost:3000'

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
