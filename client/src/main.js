import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import FBSignInButton from 'vue-facebook-signin-button'
import wysiwyg from "vue-wysiwyg";

Vue.config.productionTip = false

Vue.use(FBSignInButton)
Vue.use(wysiwyg, {
  minheight: '500px'
});
Vue.prototype.$baseurl = 'http://localhost:3000'

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
