import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      component: () => import('./views/Home.vue'),
      children: [
        {
          path: '/',
          name: 'all-question',
          props: true,
          component: () => import('./components/AllQuestion.vue')
        },
        {
          path: 'create',
          name: 'create-question',
          component: () => import('./components/CreateQuestion.vue')
        },
        {
          path: 'question/:id',
          name: 'detail-question',
          props: true,
          component: () => import('./components/DetailQuestion.vue')
        },
        {
          path: 'edit/:id',
          name: 'edit-question',
          props: true,
          component: () => import('./components/EditQuestion.vue')
        }
      ]
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('./views/About.vue')
    }
  ]
})
