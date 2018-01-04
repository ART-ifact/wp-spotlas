
<template>
   <v-app id="inspire" dark>
    <v-toolbar app fixed clipped-left>
      <v-toolbar-title>Spottr</v-toolbar-title>
    </v-toolbar>
    <v-content>
      <v-container fluid fill-height>
       <router-view></router-view>
       <a href="/wordpress/add/" class="btn btn--absolute btn--floating btn--right btn--top theme--dark teal" data-ripple="true"><div class="btn__content"><i aria-hidden="true" class="material-icons icon">add</i></div></a>
      </v-container>
    </v-content>
  </v-app>
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
