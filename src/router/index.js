import Vue from 'vue'
import Router from 'vue-router'
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'
import "vue-material-design-icons/styles.css"


// Components
import Home from '../components/Home'
import Login from '../components/Login'
import Location from '../components/Location'

Vue.use(Router)
Vue.use(VueMaterial)

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
    },
    {
      path: '/location/:id',
      name: 'Location',
      component: Location,
      components: { default: Location },
      props: { default: true }
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
