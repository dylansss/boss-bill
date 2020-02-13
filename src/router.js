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
      component: () => import(/* webpackChunkName: "home" */ './views/home')
    },
    {
      path: '/home-web',
      name: 'home-web',
      component: () => import(/* webpackChunkName: "home-web" */ './views/home-web')
    },
    {
      path: '/h5-detail',
      name: 'h5-detail',
      component: () => import(/* webpackChunkName: "h5-detail" */ './views/h5-detail')
    },
    {
      path: '/h5-add',
      name: 'h5-add',
      component: () => import(/* webpackChunkName: "h5-add" */ './views/h5-add')
    }
  ]
})
