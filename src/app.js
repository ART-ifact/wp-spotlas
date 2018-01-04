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
window.SETTINGS.LOGOUT = document.getElementsByClassName('logout-link')[0].value;
window.SETTINGS.THEMEURL = document.getElementsByClassName('theme-url')[0].value;
window.SETTINGS.MAPCENTER = { lat: parseFloat(document.getElementsByClassName('default_lat')[0].value), lng: parseFloat(document.getElementsByClassName('default_lng')[0].value) };
window.SETTINGS.mapStyles = [{
                            "featureType": "road",
                            "elementType": "labels",
                            "stylers": [{
                              "visibility": "simplified"
                            }, {
                              "lightness": 20
                            }]
                          }, {
                            "featureType": "administrative.land_parcel",
                            "elementType": "all",
                            "stylers": [{
                              "visibility": "off"
                            }]
                          }, {
                            "featureType": "landscape.man_made",
                            "elementType": "all",
                            "stylers": [{
                              "visibility": "on"
                            }]
                          }, {
                            "featureType": "transit",
                            "elementType": "all",
                            "stylers": [{
                              "saturation": -100
                            }, {
                              "visibility": "on"
                            }, {
                              "lightness": 10
                            }]
                          }, {
                            "featureType": "road.local",
                            "elementType": "all",
                            "stylers": [{
                              "visibility": "on"
                            }]
                          }, {
                            "featureType": "road.local",
                            "elementType": "all",
                            "stylers": [{
                              "visibility": "on"
                            }]
                          }, {
                            "featureType": "road.highway",
                            "elementType": "labels",
                            "stylers": [{
                              "visibility": "simplified"
                            }]
                          }, {
                            "featureType": "poi",
                            "elementType": "labels",
                            "stylers": [{
                              "visibility": "off"
                            }]
                          }, {
                            "featureType": "road.arterial",
                            "elementType": "labels",
                            "stylers": [{
                              "visibility": "on"
                            }, {
                              "lightness": 50
                            }]
                          }, {
                            "featureType": "water",
                            "elementType": "all",
                            "stylers": [{
                              "hue": "#a1cdfc"
                            }, {
                              "saturation": 30
                            }, {
                              "lightness": 49
                            }]
                          }, {
                            "featureType": "road.highway",
                            "elementType": "geometry",
                            "stylers": [{
                              "hue": "#f49935"
                            }]
                          }, {
                            "featureType": "road.arterial",
                            "elementType": "geometry",
                            "stylers": [{
                              "hue": "#fad959"
                            }]
                          }, {
                            featureType: 'road.highway',
                            elementType: 'all',
                            stylers: [{
                              hue: '#dddbd7'
                            }, {
                              saturation: -92
                            }, {
                              lightness: 60
                            }, {
                              visibility: 'on'
                            }]
                          }, {
                            featureType: 'landscape.natural',
                            elementType: 'all',
                            stylers: [{
                              hue: '#c8c6c3'
                            }, {
                              saturation: -71
                            }, {
                              lightness: -18
                            }, {
                              visibility: 'on'
                            }]
                          }, {
                            featureType: 'poi',
                            elementType: 'all',
                            stylers: [{
                              hue: '#d9d5cd'
                            }, {
                              saturation: -70
                            }, {
                              lightness: 20
                            }, {
                              visibility: 'off'
                            }]
                          }]

require('./bootstrap')

import 'babel-polyfill'
import Vue from 'vue'
import VueRouter from 'vue-router'
import VueLazyload from 'vue-lazyload'

import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'

// import { auth, database } from './firebase.config.js' - Uncomment if you need firebase
import router from './router';
import App from './App.vue';
import store from './store';
import * as types from './store/mutation-types';
import * as VueGoogleMaps from 'vue2-google-maps';
import {
  MdButton,
  MdField
} from 'vue-material/dist/components';;
import 'vue-material/dist/vue-material.min.css';
import 'vue-material/dist/theme/black-green-dark.css'; // This line here

Vue.use(MdButton);
Vue.use(MdField);
Vue.use(Vuetify);
Vue.use(VueLazyload);
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

    VueGoogleMaps.loaded.then(function () {
      self.mapOptions = {
        mapTypeControl: true,
        mapTypeControlOptions: {
          style: google.maps.MapTypeControlStyle.DROPDOWN_MENU,
          position: google.maps.ControlPosition.TOP_LEFT
        },
        streetViewControl: true,
        streetViewControlOptions: {
          position: google.maps.ControlPosition.TOP_RIGHT
        },
        zoomControl: true,
        zoomControlOptions: {
          position: google.maps.ControlPosition.TOP_RIGHT
        }
      };
    });

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
