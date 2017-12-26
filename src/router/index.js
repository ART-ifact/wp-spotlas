import Vue from 'vue'
import Router from 'vue-router'

// Components
import Home from '../components/Home'
import Login from '../components/Login'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      // props: { pageContentID: 383 }
    },
    {
      path: '/authenticate',
      name: 'Login',
      component: Login,
      // props: { pageContentID: 383 }
    }
  ],
  mode: 'history',
  base: '/wordpress',
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  }
})

export default router
