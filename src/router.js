import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'hash',
  routes: [
    {
      path: '/',
      redirect: 'home'
    },
    {
      path: '/home',
      name: 'home',
      component: () => import('./views/home')
    },
    {
      path: '/home-web',
      name: 'home-web',
      component: () => import('./views/home-web')
    },
    {
      path: '/h5-detail',
      name: 'h5-detail',
      component: () => import('./views/h5-detail')
    },
    {
      path: '/h5-add',
      name: 'h5-add',
      component: () => import('./views/h5-add')
    }
  ]
})
