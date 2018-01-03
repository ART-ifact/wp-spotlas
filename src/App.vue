
<template>
  <div class="page-container">
    <transition
      name="loader-animation"
      enter-active-class="animated fadeIn"
      leave-active-class="animated fadeOut">
      <div class="progress loader" v-if="showLoader">
        <div class="progress-bar" role="progressbar" :style="loaderStyle" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100"></div>
      </div>
    </transition>
    <md-app md-mode="reveal">
      <md-app-toolbar class="md-primary">
        <span class="md-title">Spottr</span>
        <a v-bind:href="logoutLink" class="md-button  md-primary md-theme-default">
          <div class="md-ripple"><div class="md-button-content"><i  class="md-icon md-icon-font md-theme-default">power_settings_new</i></div> <!----></div>
        </a> 
      </md-app-toolbar>

      <md-app-content>
        <router-view></router-view>
        <a href="/wordpress/add/" class="md-button md-fab md-mini md-fab-bottom-right md-primary md-theme-default btn-add">
          <div class="md-ripple"><div class="md-button-content"><i  class="md-icon md-icon-font md-theme-default">add</i></div> <!----></div>
        </a>
      </md-app-content>
      
    </md-app>
  </div>
</template>

<style lang="scss" scoped>
</style>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'
import Header from './components/partials/Header'
import Footer from './components/partials/Footer'
export default {
  name: 'Reveal',
  data: () => ({
    menuVisible: false,
    showLoader: true,
    logoutLink: window.SETTINGS.LOGOUT
  }),
  computed: {
    ...mapGetters({
      isLoading: 'isLoading',
      loadingProgress: 'loadingProgress'
    }),

    loaderStyle() {
      return `width: ${this.loadingProgress}%;`
    }
  },

  components: {
    appHeader: Header,
    appFooter: Footer
  },

  watch: {
    // watch the value of isLoading and once it's false hide the loader
    isLoading(val) {
      if (val == false) {
        let self = this
        setTimeout(function(){
          self.showLoader = false
        }, 1000)
      }
    }
  }
}
</script>
