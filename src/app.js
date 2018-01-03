window.SETTINGS = {
  // How many different dispatched actions determine loading progress
  // This is likely determined by how many dispatched actions you have below
  // in the created() method
  LOADING_SEGMENTS: 2,
  API_BASE_PATH: '/wordpress/wp-json/wp/v2/'
}

window.SETTINGS.WPPATH = '/wordpress/';
window.SETTINGS.NONCE = document.getElementsByClassName('wpnonce')[0].value;
window.SETTINGS.AJAXNONCE = document.getElementsByClassName('wpnonce-rest')[0].value;

require('./bootstrap')

import 'babel-polyfill'
import Vue from 'vue'
import VueRouter from 'vue-router'
import VueLazyload from 'vue-lazyload'

import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import router from './router'
// import { auth, database } from './firebase.config.js' - Uncomment if you need firebase
import App from './App.vue'
import store from './store'
import * as types from './store/mutation-types'
import VueCarousel from 'vue-carousel';
import * as VueGoogleMaps from 'vue2-google-maps'
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/black-green-dark.css' // This line here

Vue.use(VueMaterial)
Vue.use(VueCarousel);
Vue.use(VueLazyload);
Vue.use(BootstrapVue);
Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyA4ALxZp1Ourvckn_07_BahbGq7KI4u8Dg',
    libraries: 'places', // This is required if you use the Autocomplete plugin
  }
})
Vue.component('google-cluster', VueGoogleMaps.Cluster);

router.afterEach((to, from) => {
  // Add a body class specific to the route we're viewing
  $("body").removeClass (function (index, className) {
    return (className.match (/(^|\s)vue--page--\S+/g) || []).join(' ');
  });
  $("body").addClass("vue--page--"+_.toLower(to.name))
})


new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App),
  created () {
    this.$store.commit(types.RESET_LOADING_PROGRESS)
    this.$store.dispatch('getAllCategories')
    this.$store.dispatch('getAllPages')

    // Once user is signed in/out, uncomment if you need Firebase authentication
    // auth.onAuthStateChanged(user => {
    //   if (user) {
    //     this.$store.commit(types.LOGIN_USER)
    //     this.$store.commit(types.STORE_FETCHED_USER, user)
    //   } else {
    //     this.$store.commit(types.LOGOUT_USER)
    //   }
    // })
  }
})
